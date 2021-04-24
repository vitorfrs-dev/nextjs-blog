import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';

import { NewPostPreview } from '../components/ArticlePreview/NewPostPreview';

import { getPrismicClient } from '../services/prismic';
import { getFormattedDate } from '../utils/getFormattedDate';

import styles from '../styles/home.module.scss';
import { PostPreview } from '../components/ArticlePreview/PostPreview';

interface PostPreview {
  uid: string;
  title: string;
  publication_date: string;
  description: string;
  author: string;
  banner: string | null;
}

interface HomeProps {
  postsPreview: {
    newPostPreview: PostPreview;
    oldPostsPreview: PostPreview[];
  };
}

export default function Home({ postsPreview }: HomeProps): JSX.Element {
  return (
    <>
      <div className={styles.homeContainer}>
        <Head>
          <title>Next.js Blog Example with Prismic</title>
        </Head>

        <header className={styles.homeHeader}>
          <h1>Blog.</h1>
          <p>
            A statically generated blog example using{' '}
            <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
              Next.js
            </a>{' '}
            and{' '}
            <a href="https://prismic.io/" target="_blank" rel="noreferrer">
              Prismic
            </a>
            .
          </p>
        </header>

        <NewPostPreview previewData={postsPreview.newPostPreview} />

        <main className={styles.homeContentGrid}>
          <h1>More Stories</h1>

          <div>
            {postsPreview.oldPostsPreview.map((previewData) => (
              <PostPreview key={previewData.uid} previewData={previewData} />
            ))}
          </div>
        </main>
      </div>

      <footer className={styles.homeFooter}>
        <div className={styles.homeFooterContent}>
          <h1>Statically Generated with Next.js.</h1>
        </div>
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
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

  const [newPostPreview, ...oldPostsPreview] = previews;

  const postsPreview = {
    newPostPreview,
    oldPostsPreview,
  };

  return {
    props: {
      postsPreview,
    },
    revalidate: 60 * 30, // 30 minutes.
  };
};
