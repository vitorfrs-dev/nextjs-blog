import { RichTextBlock } from 'prismic-reactjs';

type Image = {
  alt: string | null;
  url: string;
};
export interface Post {
  uid: string;
  title: string;
  description: string;
  author: string;
  avatar: Image;
  banner: Image;
  content: RichTextBlock[];
}

export interface RawPost {
  uid?: string;
  first_publication_date?: string;
  data: Post;
}

export interface PostPreviewData {
  uid: string;
  publication_date: string;
  title: string;
  description: string;
  author: string;
  avatar: Image;
  banner: Image;
}
