import React from 'react';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';
import axios from 'axios';
import { Box, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Post } from '../../../types/post';
import { Like } from '../../../types/like';

type Props = {
  post: Post;
};

const FavoriteBtn = (props: Props) => {
  // 定義
  // -------------
  const { data: session } = useSession();
  // -------------

  // 処理
  // -------------
  // ボタンON
  const handleCreate = async (id: number) => {
    try {
      await axios.post(`/api/like/${id}`);
      mutate('/api/post');
    } catch (error) {
      console.log(error);
    }
  };
  // ボタンOFF
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/like/${id}`);
      mutate('/api/post');
    } catch (error) {
      console.log(error);
    }
  };
  // -------------

  return (
    <Box>
      {props.post.like.find(
        (like: Like) => like.user_id === session?.user.id
      ) ? (
        // いいね未実施の場合
        <IconButton size='small' onClick={() => handleDelete(props.post.id)}>
          <FavoriteIcon fontSize='small' color='error' />
          {props.post._count.like}
        </IconButton>
      ) : (
        // いいね実施済みの場合
        <IconButton size='small' onClick={() => handleCreate(props.post.id)}>
          <FavoriteBorderIcon fontSize='small' />
          {props.post._count.like}
        </IconButton>
      )}
    </Box>
  );
};

export default FavoriteBtn;
