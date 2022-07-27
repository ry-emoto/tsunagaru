import React from 'react';
import stringToColor from '../../lib/stringToColor';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Stack,
  Avatar,
  Tooltip,
  Chip,
} from '@mui/material';
import FavoriteBtn from './FavoriteBtn';
import BookmarkBtn from './BookmarkBtn';
import CommentBtn from './CommentBtn';
import { useRouter } from 'next/router';
import FormatDate from '../../lib/FormatDate';
import { Post } from '../../../types/post';

type Props = {
  post: Post;
};

const TimeLinePost = (props: Props) => {
  // 定義
  // ---------
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  // ---------

  return (
    <>
      {props.post ? (
        <ListItem alignItems='flex-start'>
          {/* ユーザー情報 */}
          <ListItemAvatar>
            {props.post?.user?.name && (
              <Tooltip title={props.post.user.name}>
                <Avatar
                  sx={{
                    bgcolor: stringToColor(props.post.user.name),
                  }}
                >
                  {props.post.user.name.slice(0, 2)}
                </Avatar>
              </Tooltip>
            )}
          </ListItemAvatar>

          {/* 投稿内容 */}
          <Stack width='100%'>
            <ListItemButton
              sx={{ m: 0, p: 0 }}
              onClick={() => router.push(`/${path}/${props.post.id}`)}
            >
              <ListItemText
                sx={{ whiteSpace: 'pre-line' }}
                primary={
                  <>
                    <Chip
                      label={props.post?.type}
                      variant='outlined'
                      size='small'
                    />
                    <br />
                    {props.post?.content}
                  </>
                }
                secondary={<FormatDate dateString={props.post.created_at} />}
              />
            </ListItemButton>

            {/* アクションボタン */}
            <Stack
              direction='row'
              justifyContent='space-around'
              alignItems='center'
            >
              <FavoriteBtn post={props.post} />
              <BookmarkBtn post={props.post} />
              <CommentBtn post={props.post} />
            </Stack>
          </Stack>
        </ListItem>
      ) : (
        'データ取得失敗'
      )}
    </>
  );
};

export default TimeLinePost;
