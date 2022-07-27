import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { User } from '../../../types/user';
import stringToColor from '../../lib/stringToColor';

type Props = {
  users: User[];
};

const Lanking = (props: Props) => {
  return (
    <List>
      {props.users.map((user: User, index: number) => (
        <React.Fragment key={user.id}>
          <ListItem alignItems='center'>
            {/* 順位 */}
            <Typography width='60px' fontWeight='bold'>
              {index + 1}位
            </Typography>

            {/* アバター */}
            <ListItemAvatar>
              {user?.name && (
                <Tooltip title={user.name}>
                  <Avatar
                    sx={{
                      bgcolor: stringToColor(user.name),
                    }}
                  >
                    {user.name.slice(0, 2)}
                  </Avatar>
                </Tooltip>
              )}
            </ListItemAvatar>

            {/* ユーザー情報 */}
            <Stack width='100%'>
              <ListItemText
                sx={{ whiteSpace: 'pre-line' }}
                primary={<>{user.name}</>}
                secondary={
                  <>
                    <Chip
                      label={`投稿:${user._count.post}`}
                      variant='outlined'
                      size='small'
                      component='span'
                    />
                    <Chip
                      label={`コメント:${user._count.comment}`}
                      variant='outlined'
                      size='small'
                      component='span'
                    />
                    <Chip
                      label={`いいね:${user._count.like}`}
                      variant='outlined'
                      size='small'
                      component='span'
                    />
                  </>
                }
              />
            </Stack>
          </ListItem>
          <Divider variant='fullWidth' component='li' />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Lanking;
