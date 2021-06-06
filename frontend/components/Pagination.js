import { graphql } from 'react-relay';
import Link from 'next/link';
import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';

import QueryRenderer from './QueryRenderer';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

function Pagination({ page, count }) {
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next</a>
      </Link>
    </PaginationStyles>
  );
}

const query = graphql`
  query PaginationQuery {
    _allProductsMeta {
      count
    }
  }
`;

export default function PaginationContainer({ page }) {
  function renderQuery({ error, props }) {
    if (error) {
      console.log(error);
      return <DisplayError error={error} />;
    }
    if (props) {
      const { _allProductsMeta: allProductsMeta } = props;
      return <Pagination count={allProductsMeta.count} page={page} />;
    }
    return <div>Loading</div>;
  }

  return <QueryRenderer query={query} render={renderQuery} />;
}
