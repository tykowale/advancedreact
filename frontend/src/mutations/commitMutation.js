import { commitMutation as relayCommitMutation } from 'react-relay';
import RelayEnvironment from '../relay/RelayEnvironment';

export default async function commitMutation({ mutation, variables, configs }) {
  return new Promise((resolve, reject) => {
    relayCommitMutation(RelayEnvironment, {
      mutation,
      variables,
      configs,
      onCompleted: (response, errors) => {
        if (errors) {
          reject(errors);
          return;
        }
        resolve(response);
      },
      onError: reject,
    });
  });
}
