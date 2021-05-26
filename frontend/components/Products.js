import { graphql } from 'react-relay';
import QueryRenderer from './QueryRenderer';

function Products() {
  return (
    <div>
      <p>Products!</p>
    </div>
  );
}

const renderQuery = ({ error, props }) => {
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }
  if (props) {
    return <Products />;
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
