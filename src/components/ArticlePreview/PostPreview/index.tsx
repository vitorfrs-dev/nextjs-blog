import { ReactElement } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

interface PostPreviewProps {
  previewData: {
    uid: string;
    publication_date: string;
    title: string;
    description: string;
    author: string;
    banner: string;
  };
}

export function PostPreview({ previewData }: PostPreviewProps): ReactElement {
  return (
    <div>
      <header className={styles.previewHeader}>
        <Link href={`/post/${previewData.uid}`}>
          <img src={previewData.banner} alt="banner" />
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
