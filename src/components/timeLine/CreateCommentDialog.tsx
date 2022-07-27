/* eslint-disable react/prop-types */
import * as React from 'react';
import { useRef } from 'react';
import { mutate } from 'swr';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  IconButton,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Post } from '../../../types/post';

type Props = {
  open: any;
  setOpen: any;
  post: Post;
};

const CreateCommentDialog = (props: Props) => {
  // 定義
  // -----------
  const content = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // -----------

  // 処理
  // -----------
  // ダイアログ開閉処理
  const handleClose = () => {
    props.setOpen(false);
  };
  // サブミット処理（コメント作成）
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      content: content?.current?.value,
    };
    try {
      await axios.post(`/api/comment/${props.post.id}`, newComment);
      mutate('/api/post');
      props.setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  // -----------

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={handleClose}
      fullWidth
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      {/* 閉じるボタン */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 10,
          top: 10,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* タイトル */}
      <DialogTitle>{'コメント'}</DialogTitle>

      {/* フォーム */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <TextField
            margin='dense'
            id='content'
            label='content'
            type='text'
            fullWidth
            variant='outlined'
            size='small'
            multiline
            rows={5}
            required
            inputRef={content}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            size='small'
            color='inherit'
            sx={{ borderRadius: '30px' }}
            onClick={() => {
              content!.current!.value = '';
            }}
          >
            クリア
          </Button>
          <Button
            type='submit'
            variant='contained'
            size='small'
            sx={{ borderRadius: '30px' }}
          >
            登録
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCommentDialog;
