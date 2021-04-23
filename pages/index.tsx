import Head from 'next/head';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Next JS Blog</h1>
      </div>
    </>
  );
}
