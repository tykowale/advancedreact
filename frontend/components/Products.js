import { graphql } from 'react-relay';
import styled from 'styled-components';
import QueryRenderer from './QueryRenderer';
import Product from './Product';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

function Products({ allProducts }) {
  return (
    <div>
      <ProductsListStyles>
        {allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const query = graphql`
  query ProductsQuery($first: Int, $skip: Int = 0) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function ProductsContainer({ page }) {
  const renderQuery = ({ error, props }) => {
    if (error) {
      console.log(error);
      return <DisplayError error={error} />;
    }
    if (props) {
      const { allProducts } = props;
      return <Products allProducts={allProducts} />;
    }
    return <div>Loading</div>;
  };

  const variables = {
    first: perPage,
    skip: (page - 1) * perPage,
  };

  return <QueryRenderer query={query} render={renderQuery} variables={variables} />;
}
