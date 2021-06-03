import { graphql } from 'react-relay';
import commitMutation from './commitMutation';

const mutation = graphql`
  mutation DeleteProductMutation($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

export function commit(args) {
  const variables = {
    id: args.id,
  };

  return commitMutation({
    mutation,
    variables,
  });
}
