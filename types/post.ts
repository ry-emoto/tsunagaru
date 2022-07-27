import { Bookmark } from './bookmark';
import { Comment } from './comment';
import { Count } from './count';
import { Like } from './like';
import { User } from './user';

export type Post = {
  id: number;
  type: string;
  content: string;
  user_id: number;
  user: User;
  like: Like[];
  bookmark: Bookmark[];
  comment: Comment[];
  created_at: string;
  updated_at: string;
  _count: Count;
};
