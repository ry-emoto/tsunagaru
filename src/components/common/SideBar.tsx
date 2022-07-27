import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import stringToColor from '../../lib/stringToColor';
import CreatePostDialog from './CreatePostDialog';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// サイドメニューの内容（その他メニュー一覧）
const menuList = [
  { name: 'ホーム', link: '/', icon: <HomeIcon />, description: '内容検討中' },
  {
    name: '全ての投稿',
    link: '/allPost',
    icon: <ListAltIcon />,
    description: '全ての投稿を表示するメニュー',
  },
  {
    name: '自分の投稿',
    link: '/myPost',
    icon: <ContactPageIcon />,
    description: '私の投稿を表示するメニュー',
  },
  {
    name: 'ブックマーク',
    link: '/bookmark',
    icon: <BookmarkBorderIcon />,
    description: 'ブックマークした投稿を表示するメニュー',
  },
  {
    name: '検索',
    link: '/search',
    icon: <ManageSearchIcon />,
    description: '投稿を検索するメニュー',
  },
];

const SideBar = () => {
  // 定義
  // ---------------------
  const router = useRouter();
  const selectMenu = '/' + router.pathname.split('/')[1];
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const userName = session?.user?.name;
  // ---------------------

  // 処理
  // ---------------------
  // 投稿ダイアログの表示処理
  const handleClickOpen = () => {
    setOpen(true);
  };
  // ---------------------

  return (
    <>
      <Box>
        <Toolbar variant='dense' />
        <Divider />

        {/* ユーザーメニュー */}
        <Button
          component={Stack}
          justifyContent='center'
          alignItems='center'
          spacing={1}
          sx={{ py: '20px', width: '100%', textTransform: 'none' }}
          onClick={() => router.push('/myPage')}
        >
          {userName && (
            <>
              <Avatar sx={{ bgcolor: stringToColor(userName) }}>
                {userName.slice(0, 2)}
              </Avatar>
              <Typography>{userName}</Typography>
            </>
          )}
        </Button>
        <Divider />

        {/* その他メニュー一覧 */}
        <List>
          {menuList.map((menu, index) => (
            <ListItem key={index} disablePadding>
              <Tooltip title={menu.description} placement='right-end'>
                <ListItemButton
                  selected={selectMenu === menu.link}
                  onClick={() => router.push(menu.link)}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider />

        {/* 投稿メニュー */}
        <Box sx={{ p: '30px' }}>
          <Button
            variant='contained'
            size='large'
            fullWidth
            sx={{ borderRadius: '30px' }}
            onClick={handleClickOpen}
          >
            投稿
          </Button>
        </Box>
      </Box>

      {/* 投稿ダイアログ */}
      <CreatePostDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default SideBar;
