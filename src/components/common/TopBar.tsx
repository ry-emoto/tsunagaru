import * as React from 'react';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import stringToColor from '../../lib/stringToColor';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Menu, MenuItem, Stack } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useRouter } from 'next/router';

type Props = {
  handleDrawerToggle: any;
};

const TopBar = (props: Props) => {
  // 定義
  // --------------------
  const drawerWidth = 200;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const router = useRouter();
  // --------------------

  // 処理
  // --------------------
  // ユーザーメニューの開閉
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // --------------------

  return (
    <AppBar
      position='fixed'
      color='inherit'
      elevation={1}
      sx={{
        ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        variant='dense'
        component={Stack}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        {/* 左メニュー */}
        <Stack direction='row' alignItems='center'>
          <IconButton
            color='default'
            edge='start'
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <NextLink href='/' passHref style={{ cursor: 'pointer' }}>
            <MuiLink>
              <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={0.3}
              >
                <HandshakeIcon sx={{ width: 30, height: 30 }} />
                <Typography variant='h5' fontWeight='bold'>
                  Tsunagaru
                </Typography>
              </Stack>
            </MuiLink>
          </NextLink>
        </Stack>

        {/* 右メニュー */}
        <Stack direction='row' alignItems='center' spacing={1}>
          <Stack direction='row' alignItems='center'>
            {/* ヘルプボタン */}
            <IconButton>
              <HelpOutlineIcon sx={{ width: 26, height: 26 }} />
            </IconButton>
            {/* 通知ボタン */}
            <IconButton>
              <NotificationsNoneIcon sx={{ width: 26, height: 26 }} />
            </IconButton>
          </Stack>
          {/* ユーザーメニューボタン */}
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {userName && (
              <Avatar
                sx={{ width: 30, height: 30, bgcolor: stringToColor(userName) }}
              >
                {userName.slice(0, 2)}
              </Avatar>
            )}
          </IconButton>
        </Stack>

        {/* ユーザーメニューダイアログ */}
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => router.push('/myPage')}>
            <Typography textAlign='center'>Profile</Typography>
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <Typography textAlign='center'>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
