import { SyntheticEvent, useState } from 'react';
import { Box, Card, Tab, Stack } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TimeLinePostWrap from './TimeLinePostWrap';
import ShareIcon from '@mui/icons-material/Share';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import { Post } from '../../../types/post';

type Props = {
  data: Post[];
  load: any;
  err: any;
};

const TimeLine = (props: Props) => {
  // 定義
  // -----------------
  const allPosts = props.data;
  const postsLoading = props.load;
  const postsError = props.err;
  const [value, setValue] = useState('1');
  const sharePosts = allPosts?.filter((post: Post) => post.type === '共有');
  const qaPosts = allPosts?.filter((post: Post) => post.type === 'Q&A');
  const suggestionPosts = allPosts?.filter(
    (post: Post) => post.type === '提案'
  );
  // -----------------

  // 処理
  // -----------------
  // タブの切り替え
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  // -----------------

  return (
    <Card component={Stack} alignItems='center' sx={{ p: '10px', m: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          {/* タブタイトル */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <TabList onChange={handleChange} centered>
              <Tab label={`All(${allPosts?.length})`} value='1' />
              <Tab
                icon={<ShareIcon />}
                label={`共有(${sharePosts?.length})`}
                value='2'
              />
              <Tab
                icon={<NotListedLocationOutlinedIcon />}
                label={`Q&A(${qaPosts?.length})`}
                value='3'
              />
              <Tab
                icon={<PanToolOutlinedIcon />}
                label={`提案(${suggestionPosts?.length})`}
                value='4'
              />
            </TabList>
          </Box>

          {/* タブの中身 */}
          <Box>
            <TabPanel value='1'>
              {
                <TimeLinePostWrap
                  posts={allPosts}
                  loading={postsLoading}
                  error={postsError}
                />
              }
            </TabPanel>
            <TabPanel value='2'>
              {
                <TimeLinePostWrap
                  posts={sharePosts}
                  loading={postsLoading}
                  error={postsError}
                />
              }
            </TabPanel>
            <TabPanel value='3'>
              {
                <TimeLinePostWrap
                  posts={qaPosts}
                  loading={postsLoading}
                  error={postsError}
                />
              }
            </TabPanel>
            <TabPanel value='4'>
              {
                <TimeLinePostWrap
                  posts={suggestionPosts}
                  loading={postsLoading}
                  error={postsError}
                />
              }
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Card>
  );
};

export default TimeLine;
