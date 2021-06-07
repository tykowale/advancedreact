import { graphql } from 'react-relay';
import commitMutation from './commitMutation';

const mutation = graphql`
  mutation SignUpMutation($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      email
      name
    }
  }
`;

export function commit(args) {
  const variables = {
    data: {
      name: args.name,
      email: args.email,
      password: args.password,
    },
  };

  return commitMutation({
    mutation,
    variables,
  });
}
