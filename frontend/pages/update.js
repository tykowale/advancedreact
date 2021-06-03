import { useRouter } from 'next/router';
import { graphql } from 'graphql';

import UpdateProduct from '../components/UpdateProduct';
import DisplayError from '../components/ErrorMessage';
import QueryRenderer from '../components/QueryRenderer';

const query = graphql`
  query update_SingleProductQuery($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const renderQuery = ({ error, props }) => {
  if (error) {
    console.log(error);
    return <DisplayError error={error} />;
  }

  if (props) {
    const { Product: product } = props;
    return <UpdateProduct product={product} />;
  }

  return <div>Loading</div>;
};

export default function UpdateProductContainer() {
  const router = useRouter();
  const { id } = router.query;

  if (id) {
    return <QueryRenderer query={query} render={renderQuery} variables={{ id }} />;
  }

  return null;
}
