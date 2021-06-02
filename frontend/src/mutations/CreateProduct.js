import { graphql } from 'react-relay';
import commitMutation from './commitMutation';

const mutation = graphql`
  mutation CreateProductMutation($data: ProductCreateInput!) {
    createProduct(data: $data) {
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

export function commit(args) {
  const variables = {
    data: {
      name: args.name,
      description: args.description,
      price: args.price,
      photo: args.photo,
    },
  };

  return commitMutation({
    mutation,
    variables,
  });
}
