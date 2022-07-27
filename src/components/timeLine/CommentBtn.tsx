import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CreateCommentDialog from './CreateCommentDialog';
import { Post } from '../../../types/post';

type Props = {
  post: Post;
};

const CommentBtn = (props: Props) => {
  // 定義
  // ----------
  const [open, setOpen] = useState(false);
  // ----------

  // 処理
  // ----------
  // コメント作成ダイアログ開閉処理
  const handleClickOpen = () => {
    setOpen(true);
  };
  // ----------

  return (
    <>
      {/* コメント追加ボタン */}
      <Box>
        <IconButton size='small' onClick={handleClickOpen}>
          <ChatBubbleOutlineIcon fontSize='small' />
          {props.post._count.comment}
        </IconButton>
      </Box>

      {/* コメント作成ダイアログ */}
      <CreateCommentDialog open={open} setOpen={setOpen} post={props.post} />
    </>
  );
};

export default CommentBtn;
