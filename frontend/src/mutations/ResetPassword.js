import { graphql } from 'react-relay';
import commitMutation from './commitMutation';

const mutation = graphql`
  mutation ResetPasswordMutation($email: String!, $token: String!, $password: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
      code
      message
    }
  }
`;

export function commit(args) {
  const variables = {
    email: args.email,
    token: args.token,
    password: args.password,
  };

  return commitMutation({
    mutation,
    variables,
  });
}
