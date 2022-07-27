import { signIn } from 'next-auth/react';
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import HandshakeIcon from '@mui/icons-material/Handshake';

const Login = () => {
  return (
    <Stack>
      <Box>
        {/* タイトルエリア */}
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={0.5}
          sx={{ mt: '100px' }}
        >
          <HandshakeIcon sx={{ width: 36, height: 36 }} color='primary' />
          <Typography
            variant='h4'
            fontWeight='bold'
            color='primary'
            sx={{ boxShadow: '30px' }}
          >
            Tsunagaru
          </Typography>
        </Stack>

        {/* ログインボタンエリア */}
        <Card
          component={Stack}
          width='400px'
          textAlign='center'
          spacing={3}
          elevation={10}
          sx={{ p: '60px', m: '0 auto', mt: '30px' }}
        >
          <Typography variant='h5'>Log In</Typography>
          <Stack divider={<Divider>or</Divider>} spacing={2}>
            <Stack spacing={1}>
              {/* Googleログインボタン */}
              <Button
                startIcon={<GoogleIcon />}
                variant='outlined'
                color='inherit'
                sx={{ textTransform: 'none', borderRadius: '30px' }}
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                Sign in with Google
              </Button>

              {/* GitHubログインボタン */}
              <Button
                startIcon={<GitHubIcon />}
                variant='outlined'
                color='inherit'
                sx={{ textTransform: 'none', borderRadius: '30px' }}
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                Sign in with GitHub
              </Button>
            </Stack>

            {/* ゲストログインボタン */}
            <Button
              variant='contained'
              color='primary'
              sx={{ textTransform: 'none', borderRadius: '30px' }}
              onClick={() => signIn('credentials', { callbackUrl: '/' })}
            >
              ゲストログイン
            </Button>
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
};

export default Login;
