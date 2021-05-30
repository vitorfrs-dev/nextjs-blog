import { ReactElement } from 'react';

import styles from './AuthorAvatar.module.scss';

interface AuthorAvatarProps {
  avatarUrl: string;
  author: string;
}

const AuthorAvatar = ({
  avatarUrl,
  author,
}: AuthorAvatarProps): ReactElement => {
  return (
    <div className={styles.avatar}>
      <img src={avatarUrl} alt={author} className={styles.avatar__img} />
      <span className={styles['avatar__author-name']}>{author}</span>
    </div>
  );
};

export default AuthorAvatar;
