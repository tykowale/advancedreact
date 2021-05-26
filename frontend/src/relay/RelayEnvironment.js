import { Environment, Store, RecordSource } from 'relay-runtime';
import { batchMiddleware, RelayNetworkLayer, urlMiddleware } from 'react-relay-network-modern';
import { endpoint } from '../../config';

function network() {
  return new RelayNetworkLayer([
    urlMiddleware({
      url: () => endpoint,
    }),
    batchMiddleware({
      batchUrl: () => endpoint,
      batchTimeout: 10,
    }),
  ]);
}

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network: network(),
  store,
});
