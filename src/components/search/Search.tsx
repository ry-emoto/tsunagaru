import { useRouter } from 'next/router';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FormatDate from '../../lib/FormatDate';
import { Post } from '../../../types/post';

type Props = {
  data: Post[];
  load: any;
  err: any;
};

const Search = (props: Props) => {
  // 定義
  // -----------------
  const router = useRouter();
  // 投稿テーブルのカルムデータ
  const columns: GridColDef[] = [
    { field: 'id' },
    { field: 'type', headerName: '種別' },
    { field: 'content', headerName: '内容', width: 300 },
    {
      field: 'comment_cnt',
      renderHeader: () => (
        <ChatBubbleOutlineIcon fontSize='small' color='inherit' />
      ),
      valueGetter: (params) => params.row._count.comment,
      width: 60,
    },
    {
      field: 'like_cnt',
      renderHeader: () => (
        <FavoriteBorderIcon fontSize='small' color='inherit' />
      ),
      valueGetter: (params) => params.row._count.like,
      width: 60,
    },
    {
      field: 'bookmark_cnt',
      renderHeader: () => (
        <BookmarkBorderIcon fontSize='small' color='inherit' />
      ),
      valueGetter: (params) => params.row._count.bookmark,
      width: 60,
    },
    {
      field: 'user_name',
      headerName: '投稿者',
      valueGetter: (params) => params.row.user.name,
    },
    {
      field: 'created_at',
      headerName: '投稿日',
      renderCell: (params) => <FormatDate dateString={params.value} />,
      width: 160,
    },
  ];
  // -----------------

  return (
    <>
      {props.err ? (
        'データ取得失敗...'
      ) : props.load ? (
        'Loading中...'
      ) : (
        <Paper sx={{ height: 800 }}>
          {/* 投稿テーブル */}
          <DataGrid
            rows={props.data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            onRowClick={(params) => {
              router.push(`${router.pathname}/${params.id}`);
            }}
            sx={{
              p: '30px',
              '.MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
              '.MuiDataGrid-columnHeaderTitleContainer': {
                justifyContent: 'center',
              },
            }}
          />
        </Paper>
      )}
    </>
  );
};

export default Search;
