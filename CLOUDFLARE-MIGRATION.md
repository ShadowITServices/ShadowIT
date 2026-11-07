# Cloudflare Pages migration + protected documentation

Runbook for moving shadowit.com.au off GitHub Pages and onto Cloudflare Pages, and
for standing up an authenticated documentation site behind Cloudflare Access.

Not published by Docusaurus — only `docs/` and `src/pages/` become routes.

---

## Why this is happening

Three findings, each verified rather than assumed:

1. **The GitHub Pages origin answers the public internet directly.** Sending the
   site's Host header to a published GitHub Pages IP returns the full page with
   HTTP 200, without the request passing through Cloudflare:

   ```bash
   curl -sL --resolve "shadowit.com.au:80:185.199.108.153" "http://shadowit.com.au/docs/intro/"
   ```

   Anything enforced at the Cloudflare edge — Access, WAF, a password — is therefore
   advisory on the current architecture. This is the main reason for the move: with
   a Pages project, Cloudflare is both edge and origin and there is no second door.

2. **A path-scoped access rule is not a boundary on a Docusaurus site.** Every page's
   content is compiled into JS chunks under `/assets/` and into `/search-index.json`
   at the site root. Protecting `/docs/private/*` leaves the same text readable at
   two other public URLs. Confirmed by grepping the build output for a phrase from a
   docs page: it appears in the page HTML, in two `/assets/js/*.js` chunks, and in
   `search-index.json`.

3. **The repository is public**, so every `.mdx` source file is readable from
   raw.githubusercontent.com regardless of what the website does.

The consequence of (2) and (3): sensitive material cannot live in this site or this
repository. It needs a separate hostname, a separate project, and a separate private
repository — Part B below.

---

## Already done in this repo

| Change | Why |
|---|---|
| `/.node-version` → `20` | Cloudflare Pages otherwise picks its own default; 20 matches the proven CI build |
| `/static/_headers` | Security headers + cache policy. Read from the build root by Pages; ignored by GitHub Pages, so it is safe pre-cutover |
| `/static/_redirects` | Real 301s for the retired `/services` paths and the lower-case `/study/az-104`. Replaces the meta-refresh stubs |
| `trailingSlash: true` in `docusaurus.config.ts` | Pinned so existing trailing-slash URLs stay valid; Pages resolves them differently by default |
| `CLAUDE.md` hosting section | Rewritten so future work targets Pages and does not reintroduce the bypass |

Build verified after all of the above: `npm run build` succeeds, `/`, `/about/`,
`/tools/licensing/`, `/study/AZ-104/`, `/docs/intro/` and `/docs/script-repository/`
all serve 200 from the local build, and `_headers` and `_redirects` land at the
build root.

---

## Part A — Cut the public site over to Cloudflare Pages

Nothing here is destructive until step A5. The site keeps serving from GitHub Pages
until the DNS record changes.

**A1. Create the Pages project.** Cloudflare dashboard → Workers & Pages → Create →
Pages → Connect to Git → select `ShadowITServices/ShadowIT`.

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `build`
- Node version: read from `/.node-version` automatically; if the build complains,
  set `NODE_VERSION=20` as an environment variable

**A2. Let it build.** You get a `*.pages.dev` URL. Check it thoroughly *before*
touching DNS — this is the whole site on the new host, with no risk:

- The homepage panels scroll and snap
- `/docs/` search returns results
- `/tools/licensing/` calculator runs
- Dark and light mode
- A deliberate 404 renders the Docusaurus 404 page

**A3. Decide the canonical hostname.** This needs a decision, not a default:
`docusaurus.config.ts` currently sets `url: 'https://www.shadowit.com.au'`, while
`static/CNAME` says `www.shadowit.com.au` and the live site redirects to the apex
`shadowit.com.au`. Pick one, set `url` to match, and redirect the other. Getting
this wrong splits your search-engine ranking across two hostnames.

**A4. Attach the custom domain.** Pages project → Custom domains → add the apex and
`www`. Because the zone is already on Cloudflare, it creates the DNS records itself.

**A5. Cut over.** The custom domain going live is the cutover. Watch for TLS to
provision (usually a minute or two, occasionally longer).

**A6. Verify — including that the bypass is gone.**

```bash
curl -sI https://shadowit.com.au/ | head -5
curl -s -o /dev/null -w "%{http_code}\n" https://shadowit.com.au/study/az-104/   # expect 301
curl -sI https://shadowit.com.au/ | grep -i "strict-transport\|x-content-type"   # headers applied
curl -sL --resolve "shadowit.com.au:80:185.199.108.153" "http://shadowit.com.au/docs/intro/" | head -5
```

The last one is the important one. After A7 it must **not** return site content.

**A7. Close the old door.** This is the step that makes the migration worth anything:

- GitHub → repo → Settings → Pages → **remove the custom domain**
- Delete `static/CNAME` from the repo (otherwise the next fallback deploy re-claims it)
- Change `.github/workflows/deploy.yml` to `workflow_dispatch:` only, so it cannot
  auto-deploy and reattach the domain

  Be clear-eyed about what the fallback is worth afterwards: without the custom
  domain it deploys to `shadowitservices.github.io/ShadowIT`, which needs a
  different `baseUrl` to work properly. **Cloudflare Pages' own deployment history
  is the real rollback** — any previous build can be promoted to production in one
  click. Treat the workflow as a break-glass artefact, not a live standby.

**A8. Clean up.** Delete `static/services/` (the meta-refresh stubs) — `_redirects`
now issues proper 301s. Re-run the redirect checks in A6 afterwards.

### Rollback

Before A7: remove the custom domain from the Pages project and re-point DNS at
GitHub Pages. After A7: promote a previous deployment in the Pages dashboard, or
re-add the custom domain to GitHub Pages and restore `static/CNAME`.

---

## Part B — The protected documentation site

A second Pages project on its own hostname, with Access over the whole hostname.
This is the only arrangement that actually holds, for the reasons in finding (2).

**B1. Private repository.** Create `ShadowITServices/ShadowIT-Vault`, **private**.
Sensitive content never enters the public repo — and note that anything already
committed there is in the git history permanently, so treat it as disclosed and
rotate accordingly.

**B2. Vault site.** A second Docusaurus install, docs-only
(`routeBasePath: '/'`, no blog, no marketing pages). Two settings that matter:

- `noIndex: true` in `docusaurus.config.ts`
- `static/robots.txt` with `User-agent: *` / `Disallow: /` — belt and braces, since
  Access already blocks crawlers at the edge

**B3. Second Pages project**, same build settings as A1, custom domain
`vault.shadowit.com.au` (or whatever you prefer — the name is public in certificate
transparency logs, so pick something that doesn't itself disclose anything).

**B4. Cloudflare Access.** Zero Trust → Access → Applications → Add → Self-hosted:

- Application domain: `vault.shadowit.com.au`, path left **empty** — the whole
  hostname, which is the point
- Session duration: 24 hours is a reasonable starting point
- Policy: Allow, with Include → one of:
  - **Emails** — explicit list; simplest, no IdP setup, fine for a handful of people
  - **Entra ID group** — wire Entra as an identity provider first (Zero Trust →
    Settings → Authentication → Add new → Azure AD). Better: group membership and
    MFA come from the tenant, and offboarding is automatic
- Optionally require a second factor via the IdP, and add a device-posture rule later

Free for up to 50 users.

**B5. Verify.**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://vault.shadowit.com.au/            # expect 302 to the Access login
curl -s -o /dev/null -w "%{http_code}\n" https://vault.shadowit.com.au/search-index.json
curl -s -o /dev/null -w "%{http_code}\n" https://vault.shadowit.com.au/assets/js/
```

All three must be blocked, not just the first. That is the test the old design would
have failed.

**B6. Operate it.** Zero Trust → Logs → Access gives you per-request audit records:
who, when, from where, which policy allowed it. Review periodically — an access list
nobody reviews is a list that only grows.

---

## Still worth considering

For genuine client data — anything with a confidentiality obligation attached — a
documentation site behind Access is still a weaker control than SharePoint with
sensitivity labels, or ITGlue. Those give per-client scoping, DLP, expiry, external
sharing controls and retention, none of which Access provides. The vault is a good
answer for internal runbooks and working notes; it is not a document management
system, and the distinction is worth keeping deliberately.
