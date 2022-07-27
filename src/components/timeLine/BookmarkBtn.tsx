import React from 'react';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';
import axios from 'axios';
import { Box, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Bookmark } from '../../../types/bookmark';
import { Post } from '../../../types/post';

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
      await axios.post(`/api/bookmark/${id}`);
      mutate('/api/post');
    } catch (error) {
      console.log(error);
    }
  };
  // ボタンOFF
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/bookmark/${id}`);
      mutate('/api/post');
    } catch (error) {
      console.log(error);
    }
  };
  // -------------

  return (
    <Box>
      {props.post.bookmark.find(
        (bookmark: Bookmark) => bookmark.user_id === session?.user.id
      ) ? (
        // ブックマーク未実施の場合
        <IconButton size='small' onClick={() => handleDelete(props.post.id)}>
          <BookmarkIcon fontSize='small' color='primary' />
          {props.post._count.bookmark}
        </IconButton>
      ) : (
        // ブックマーク実施ずみの場合
        <IconButton size='small' onClick={() => handleCreate(props.post.id)}>
          <BookmarkBorderIcon fontSize='small' />
          {props.post._count.bookmark}
        </IconButton>
      )}
    </Box>
  );
};

export default FavoriteBtn;
