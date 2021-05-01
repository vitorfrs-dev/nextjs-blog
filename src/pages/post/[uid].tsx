import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import Prismic from '@prismicio/client';

import { RichText } from 'prismic-reactjs';
import styles from '../../styles/Posts.module.scss';
import { getPrismicClient } from '../../services/prismic';
import { Post as PostType } from '../../types/Post';

import { getFormattedDate } from '../../utils/getFormattedDate';
import { PostPreview } from '../../components/ArticlePreview/PostPreview';

interface PostProps {
  post: PostType;
  otherPosts: PostType[];
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
          <div>
            <div />
            <span>{post.author}</span>
          </div>
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
              <PostPreview key={p.slug} previewData={p} />
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
      fetch: ['post.banner', 'post.title', 'post.description', 'post.author'],
      orderings: '[document.first_publication_date desc]',
      pageSize: 5,
    },
  );

  const previews = response.results.map((post) => {
    return {
      uid: post.uid,
      publication_date: getFormattedDate(post.first_publication_date),
      title: post.data.title,
      description: post.data.description,
      author: post.data.author,
      banner: post.data.banner.url,
    };
  });

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
