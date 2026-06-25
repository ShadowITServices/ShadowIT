import React, {type ReactNode} from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import type {WrapperProps} from '@docusaurus/types';
import SearchBar from '@theme/SearchBar';
import styles from './styles.module.css';

type Props = WrapperProps<typeof ContentType>;

/**
 * Wraps the desktop docs sidebar content (the menu) and injects a search box at
 * the very top — above "Introduction" — inside the sticky sidebar. Wrapping
 * (not ejecting) keeps this upgrade-safe. SearchBar is provided by the local
 * search theme configured in docusaurus.config.ts.
 */
export default function ContentWrapper(props: Props): ReactNode {
  return (
    <>
      <div className={styles.sidebarSearch}>
        <SearchBar />
      </div>
      <Content {...props} />
    </>
  );
}
