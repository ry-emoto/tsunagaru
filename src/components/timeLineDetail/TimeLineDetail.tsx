import React from 'react';
import TimeLinePost from '../timeLine/TimeLinePost';
import stringToColor from '../../lib/stringToColor';
import {
  Avatar,
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import FormatDate from '../../lib/FormatDate';
import { Comment } from '../../../types/comment';
import { Post } from '../../../types/post';

type Props = {
  data: Post;
  load: any;
  err: any;
};

const TimeLineDetail = (props: Props) => {
  // 定義
  // -------------
  const post = props.data;
  const postsLoading = props.load;
  const postsError = props.err;
  const sortComments = post?.comment?.reduceRight(
    (p: any, c: any) => [...p, c],
    []
  );
  // -------------

  return (
    <>
      {postsError ? (
        'データ取得失敗...'
      ) : postsLoading ? (
        'Loading中...'
      ) : (
        <Box component={Stack} alignItems='center' sx={{ m: 'auto' }}>
          <Stack spacing={1} sx={{ width: '100%' }}>
            {/* 投稿内容 */}
            <Card sx={{ p: '20px' }}>
              <TimeLinePost post={post} />
            </Card>

            {/* コメント一覧 */}
            {sortComments && sortComments.length > 0 ? (
              <>
                <Typography>{`コメント一覧（${sortComments?.length}件）`}</Typography>
                <Card sx={{ p: '10px' }}>
                  <List>
                    {sortComments.map((comment: Comment) => (
                      <React.Fragment key={comment.id}>
                        <ListItem alignItems='flex-start'>
                          <ListItemAvatar>
                            {comment?.user?.name && (
                              <Tooltip title={comment.user.name}>
                                <Avatar
                                  sx={{
                                    bgcolor: stringToColor(comment.user.name),
                                  }}
                                >
                                  {comment.user.name.slice(0, 2)}
                                </Avatar>
                              </Tooltip>
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ whiteSpace: 'pre-line' }}
                            primary={comment.comment}
                            secondary={
                              <FormatDate dateString={comment.created_at} />
                            }
                          />
                        </ListItem>
                        <Divider variant='fullWidth' component='li' />
                      </React.Fragment>
                    ))}
                  </List>
                </Card>
              </>
            ) : (
              <Typography>コメントはまだありません。</Typography>
            )}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default TimeLineDetail;
