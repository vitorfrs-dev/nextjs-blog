import { ReactElement } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { PostPreviewData } from '../../../types/Post';

interface PostPreviewProps {
  previewData: PostPreviewData;
}

export function PostPreview({ previewData }: PostPreviewProps): ReactElement {
  return (
    <div>
      <header className={styles.previewHeader}>
        <Link href={`/post/${previewData.uid}`}>
          <img src={previewData.banner.url} alt="banner" />
        </Link>
        <Link href={`/post/${previewData.uid}`}>
          <a>{previewData.title}</a>
        </Link>

        <time>{previewData.publication_date}</time>
      </header>

      <main className={styles.previewContent}>
        <p>{previewData.description}</p>
        <span>{previewData.author}</span>
      </main>
    </div>
  );
}
