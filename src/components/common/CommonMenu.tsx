import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SideBar from './SideBar';
import TopBar from './TopBar';

const CommonMenu = (props: { children?: any; window?: any }) => {
  // 定義
  // --------------------
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawerWidth = 200; // トップメニューの幅
  const [mobileOpen, setMobileOpen] = useState(false);
  // --------------------

  // 処理
  // --------------------
  // サイドメニューバーの開閉処理
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // --------------------

  return (
    <Box sx={{ display: 'flex' }}>
      {/* トップメニュー */}
      <TopBar handleDrawerToggle={handleDrawerToggle} />

      {/* サイドメニュー */}
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* レスポンシブ：PC用 */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <SideBar />
        </Drawer>

        {/* レスポンシブ：スマホ用 */}
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>

      {/* メイン */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar variant='dense' />
        <Box maxWidth='1000px' sx={{ m: 'auto' }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default CommonMenu;
