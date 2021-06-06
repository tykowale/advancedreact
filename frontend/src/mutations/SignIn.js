import { graphql } from 'react-relay';
import commitMutation from './commitMutation';

const mutation = graphql`
  mutation SignInUserMutation($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
    }
  }
`;

export function commit(args) {
  const variables = {
    email: args.email,
    password: args.password,
  };

  return commitMutation({
    mutation,
    variables,
  });
}
