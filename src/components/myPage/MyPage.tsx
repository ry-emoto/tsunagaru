import { Card, Stack, Avatar, Typography, Divider } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import stringToColor from '../../lib/stringToColor';
import { User } from '../../../types/user';

type Props = {
  user: User;
};

const MyPage = (props: Props) => {
  return (
    <Card component={Stack} alignItems='center' sx={{ p: '10px', m: 'auto' }}>
      <Stack sx={{ width: '100%', p: '50px' }} spacing={4}>
        {/* ユーザー名 */}
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar
            sx={{
              width: '64px',
              height: '64px',
              bgcolor: stringToColor(props.user.name),
            }}
          >
            {props.user.name.slice(0, 2)}
          </Avatar>
          <Stack>
            <Typography>{props.user.name}</Typography>
            <Typography>{props.user.email}</Typography>
          </Stack>
        </Stack>
        <Divider />

        {/* ユーザー情報 */}
        <Stack spacing={2} color='GrayText'>
          <Stack direction='row' alignItems='center' spacing={1}>
            <PostAddIcon fontSize='small' />
            <Typography>投稿数：</Typography>
            <Typography>{props.user._count.post}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <FavoriteBorderIcon fontSize='small' />
            <Typography>いいね数：</Typography>
            <Typography>{props.user._count.like}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <BookmarkBorderIcon fontSize='small' />
            <Typography>ブックマーク数：</Typography>
            <Typography>{props.user._count.bookmark}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <ChatBubbleOutlineIcon fontSize='small' />
            <Typography>コメント数：</Typography>
            <Typography>{props.user._count.comment}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default MyPage;
