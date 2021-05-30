import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import Prismic from '@prismicio/client';

import { RichText } from 'prismic-reactjs';
import styles from '../../styles/Posts.module.scss';
import { getPrismicClient } from '../../services/prismic';
import { Post as PostType, PostPreviewData } from '../../types/Post';

import { PostPreview } from '../../components/ArticlePreview/PostPreview';
import parsePreviewdata from '../../utils/parsePreviewData';
import AuthorAvatar from '../../components/AuthorAvatar';

interface PostProps {
  post: PostType;
  otherPosts: PostPreviewData[];
}

export default function Post({ post, otherPosts }: PostProps): ReactElement {
  return (
    <>
      <Head>
        <title>Blog | {post.title}</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{post.title}</h1>
          <AuthorAvatar avatarUrl={post.avatar.url} author={post.author} />
        </header>
        <div className={styles.content}>
          <img className={styles.banner} src={post.banner.url} alt="banner" />
          <div className={styles.contentArea}>
            {RichText.render(post.content)}
          </div>
        </div>
        <div className={styles.moreStories}>
          <h1>More Stories</h1>
          <div>
            {otherPosts.map((p) => (
              <PostPreview key={p.uid} previewData={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const client = getPrismicClient();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: postData } = await client.getByUID(
    'post',
    String(params.uid),
    {},
  );

  const response = await client.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: [
        'post.banner',
        'post.title',
        'post.description',
        'post.author',
        'post.avatar',
      ],
      orderings: '[document.first_publication_date desc]',
      pageSize: 5,
    },
  );

  const previews = response.results.map(parsePreviewdata);

  return {
    props: {
      post: postData,
      otherPosts: previews,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await client.query(
    Prismic.Predicates.at('document.type', 'post'),
  );

  const postUids = results.map((post) => ({ params: { uid: post.uid } }));

  return {
    paths: postUids,
    fallback: false,
  };
};
