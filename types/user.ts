import { Bookmark } from './bookmark';
import { Comment } from './comment';
import { Count } from './count';
import { Like } from './like';
import { Post } from './post';

export type User = {
  id: number;
  name: string;
  email: string;
  post: Post[];
  like: Like[];
  bookmark: Bookmark[];
  comment: Comment[];
  created_at: string;
  updated_at: string;
  _count: Count;
};
