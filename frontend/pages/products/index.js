import { useRouter } from 'next/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function ProductsPage() {
  const router = useRouter();
  const { page } = router.query;
  const pageNumber = Number(page) || 1;

  return (
    <>
      <Pagination page={pageNumber} />
      <Products />
      <Pagination page={pageNumber} />
    </>
  );
}
