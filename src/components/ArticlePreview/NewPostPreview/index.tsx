import { ReactElement } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

interface NewPostPreviewProps {
  previewData: {
    uid: string;
    publication_date: string;
    title: string;
    description: string;
    author: string;
    banner: string;
  };
}

export function NewPostPreview({
  previewData,
}: NewPostPreviewProps): ReactElement {
  return (
    <div className={styles.container}>
      <Link href={`/post/${previewData.uid}`}>
        <img src={previewData.banner} alt="banner" />
      </Link>
      <main className={styles.content}>
        <div>
          <Link href={`/post/${previewData.uid}`}>
            <a>{previewData.title}</a>
          </Link>
          <time>{previewData.publication_date}</time>
        </div>

        <div>
          <p>{previewData.description}</p>
          <span>{previewData.author}</span>
        </div>
      </main>
    </div>
  );
}
