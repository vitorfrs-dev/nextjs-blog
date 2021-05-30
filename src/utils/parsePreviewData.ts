import { RawPost, PostPreviewData } from '../types/Post';
import { getFormattedDate } from './getFormattedDate';

export default function parsePreviewData(post: RawPost): PostPreviewData {
  return {
    uid: post.uid,
    publication_date: getFormattedDate(post.first_publication_date),
    title: post.data.title,
    description: post.data.description,
    author: post.data.author,
    banner: post.data.banner,
  };
}
