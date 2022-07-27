import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import React from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { User } from '../../../types/user';

type Props = {
  user: User;
};

const Mission = (props: Props) => {
  // 定義
  // ------------
  const missionLists = [
    {
      icon: <PostAddIcon />,
      title: '『投稿』の実施',
      sub: '投稿をしてみましょう!',
      count: props.user._count.post,
    },
    {
      icon: <ChatBubbleOutlineOutlinedIcon />,
      title: '『コメント』の実施',
      sub: 'コメントをしてみましょう!',
      count: props.user._count.comment,
    },
    {
      icon: <FavoriteBorderIcon />,
      title: '『いいね』の実施',
      sub: 'いいねをしてみましょう!',
      count: props.user._count.like,
    },
    {
      icon: <BookmarkBorderOutlinedIcon />,
      title: '『ブックマーク』の実施',
      sub: 'ブックマークをしてみましょう!',
      count: props.user._count.bookmark,
    },
  ];
  // ------------

  return (
    <List>
      {missionLists.map((list: any, index: number) => (
        <React.Fragment key={index}>
          <ListItem alignItems='center'>
            {/* ミッションのタイトル */}
            <ListItemAvatar>
              <Avatar>{list.icon}</Avatar>
            </ListItemAvatar>
            <Stack width='100%'>
              <ListItemText
                sx={{ whiteSpace: 'pre-line' }}
                primary={<>{list.title}</>}
                secondary={<>{list.sub}</>}
              />
            </Stack>

            {/* ミッションのクリア回数 */}
            <Stack direction='row' spacing={1}>
              <Chip
                label='1回'
                color='primary'
                variant={list.count > 0 ? 'filled' : 'outlined'}
              />
              <Chip
                label='10回'
                color='success'
                variant={list.count > 9 ? 'filled' : 'outlined'}
              />
              <Chip
                label='50回'
                color='error'
                variant={list.count > 49 ? 'filled' : 'outlined'}
              />
            </Stack>
          </ListItem>
          <Divider variant='fullWidth' component='li' />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Mission;
