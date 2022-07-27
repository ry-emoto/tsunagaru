import { createTheme } from '@mui/material/styles';

// フォントを設定
const fontFamily = [
  'Noto Sans JP',
  'メイリオ',
  'ＭＳ Ｐゴシック',
  'sans-serif',
].join(',');

// ---------------
// テーマを設定
// ---------------
const theme = createTheme({
  typography: {
    fontFamily, // フォント
  },
  palette: {
    // Secondaryカラーを設定
    secondary: {
      light: '#33eb91',
      main: '#00e676',
      dark: '#00a152',
      contrastText: '#ffffff',
    },
    background: {
      default: '#edf2f7',
    },
  },
});

export default theme;
