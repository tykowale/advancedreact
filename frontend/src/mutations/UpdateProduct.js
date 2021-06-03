import { graphql } from 'react-relay';
import commitMutation from './commitMutation';

const mutation = graphql`
  mutation UpdateProductMutation($id: ID!, $data: ProductUpdateInput) {
    updateProduct(data: $data, id: $id) {
      id
      name
      description
      price
    }
  }
`;

export function commit(args) {
  const variables = {
    id: args.id,
    data: {
      name: args.name,
      description: args.description,
      price: args.price,
    },
  };

  return commitMutation({
    mutation,
    variables,
  });
}
