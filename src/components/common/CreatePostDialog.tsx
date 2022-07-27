/* eslint-disable react/prop-types */
import * as React from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { mutate } from 'swr';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: any;
  setOpen: any;
};

const CreatePostDialog = (props: Props) => {
  // 定義
  // ---------------------
  const type = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const typeList = [
    { id: 1, value: '共有' },
    { id: 2, value: 'Q&A' },
    { id: 3, value: '提案' },
  ];
  // ---------------------

  // 処理
  // ---------------------
  // 閉じる処理
  const handleClose = () => {
    props.setOpen(false);
  };

  // サブミット処理（投稿登録）
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      type: type?.current?.value,
      content: content?.current?.value,
    };
    try {
      await axios.post('/api/post', newPost);
      mutate('/api/post');
      props.setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  // ---------------------

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
      <DialogTitle>{'新規投稿'}</DialogTitle>

      {/* 入力フォーム */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <FormControl fullWidth size='small'>
            <InputLabel>Type</InputLabel>
            <Select inputRef={type} defaultValue={typeList[0].value}>
              {typeList.map((list) => (
                <MenuItem key={list.id} value={list.value}>
                  {list.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              type!.current!.value = '';
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

export default CreatePostDialog;
