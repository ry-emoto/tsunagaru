import { Post } from './post';
import { User } from './user';

export type Like = {
  id: number;
  post_id: number;
  post: Post;
  user_id: number;
  user: User;
};
