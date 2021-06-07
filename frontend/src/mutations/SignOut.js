import { graphql } from 'react-relay';
import commitMutation from './commitMutation';

const mutation = graphql`
  mutation SignOutMutation {
    endSession
  }
`;

export function signOut() {
  return commitMutation({
    mutation,
  });
}
