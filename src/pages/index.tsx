import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';

import { NewPostPreview } from '../components/ArticlePreview/NewPostPreview';

import { getPrismicClient } from '../services/prismic';
import styles from '../styles/Home.module.scss';
import { PostPreview } from '../components/ArticlePreview/PostPreview';
import parsePreviewData from '../utils/parsePreviewData';
import { PostPreviewData } from '../types/Post';

interface HomeProps {
  postsPreview: {
    newPostPreview: PostPreviewData;
    oldPostsPreview: PostPreviewData[];
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

  const previews = response.results.map(parsePreviewData);

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
