import { graphql } from 'react-relay';
import styled from 'styled-components';
import QueryRenderer from './QueryRenderer';
import Product from './Product';

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

const renderQuery = ({ error, props }) => {
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }
  if (props) {
    const { allProducts } = props;
    return <Products allProducts={allProducts} />;
  }
  return <div>Loading</div>;
};

const query = graphql`
  query Products_AllProductsQuery {
    allProducts {
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

export default function ProductsContainer() {
  return <QueryRenderer query={query} render={renderQuery} />;
}
