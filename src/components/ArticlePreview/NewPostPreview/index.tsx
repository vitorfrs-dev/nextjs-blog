import { ReactElement } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { PostPreviewData } from '../../../types/Post';
import AuthorAvatar from '../../AuthorAvatar';

interface NewPostPreviewProps {
  previewData: PostPreviewData;
}

export function NewPostPreview({
  previewData,
}: NewPostPreviewProps): ReactElement {
  return (
    <div className={styles.container}>
      <Link href={`/post/${previewData.uid}`}>
        <img
          src={previewData.banner.url}
          alt="banner"
          className={styles.banner}
        />
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
          <AuthorAvatar
            avatarUrl={previewData.avatar.url}
            author={previewData.author}
          />
        </div>
      </main>
    </div>
  );
}
