import { Post } from './post';
import { User } from './user';

export type Comment = {
  id: number;
  comment: string;
  post_id: number;
  post: Post;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
};
