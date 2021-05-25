import { endpoint } from '../../config';

async function fetchGraphQL(text, variables) {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });
}

export default fetchGraphQL;
