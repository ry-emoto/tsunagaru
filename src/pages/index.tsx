import { NextSeo } from 'next-seo';
import CommonMenu from '../components/common/CommonMenu';

const index = () => {
  return (
    <>
      <NextSeo title='ホーム|Tsunagaru' description='Tsunagaruホームページ' />
      <CommonMenu>Home</CommonMenu>
    </>
  );
};

export default index;
