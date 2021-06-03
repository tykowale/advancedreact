import { graphql } from 'react-relay';
import { useRouter } from 'next/router';
import QueryRenderer from '../../components/QueryRenderer';
import SingleProduct from '../../components/SingleProduct';
import DisplayError from '../../components/ErrorMessage';

const query = graphql`
  query Id_SingleProductQuery($id: ID!) {
    Product(where: { id: $id }) {
      name
      id
      description
      price
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
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
    return <SingleProduct product={product} />;
  }

  return <div>Loading</div>;
};

export default function SingleProductContainer() {
  const router = useRouter();
  const { id } = router.query;

  if (id) {
    return <QueryRenderer query={query} render={renderQuery} variables={{ id }} />;
  }

  return null;
}
