export interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  banner: {
    alt: string | null;
    url: string;
  };
  content: unknown;
}
