import { graphql } from 'react-relay';
import commitMutation from './commitMutation';

const mutation = graphql`
  mutation RequestResetMutation($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

export function commit(args) {
  const variables = {
    email: args.email,
  };

  return commitMutation({
    mutation,
    variables,
  });
}
