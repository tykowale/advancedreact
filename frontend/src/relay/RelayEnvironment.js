import { Environment, Store, RecordSource } from 'relay-runtime';
import {
  batchMiddleware,
  RelayNetworkLayer,
  urlMiddleware,
  cacheMiddleware,
} from 'react-relay-network-modern';
import RelayRequestBatch from 'react-relay-network-modern/lib/RelayRequestBatch';
import { extractFiles } from 'extract-files';

import { endpoint } from '../../config';

function uploadMiddleware() {
  return (next) => async (req) => {
    if (req instanceof RelayRequestBatch) {
      throw new Error('RelayRequestBatch is not supported');
    }

    const operations = {
      query: req.operation.text,
      variables: req.variables,
    };

    const { clone: extractedOperations, files } = extractFiles(operations);

    if (files.size) {
      const formData = new FormData();

      formData.append('operations', JSON.stringify(extractedOperations));

      const pathMap = {};
      let i = 0;
      files.forEach((paths) => {
        // eslint-disable-next-line no-plusplus
        pathMap[++i] = paths;
      });
      formData.append('map', JSON.stringify(pathMap));

      i = 0;
      files.forEach((paths, file) => {
        // eslint-disable-next-line no-plusplus
        formData.append(++i, file, file.name);
      });

      req.fetchOpts.method = 'POST';
      req.fetchOpts.body = formData;
    }

    return next(req);
  };
}

function network() {
  return new RelayNetworkLayer([
    urlMiddleware({
      url: () => endpoint,
    }),
    batchMiddleware({
      batchUrl: () => endpoint,
      batchTimeout: 10,
    }),
    uploadMiddleware(),
    cacheMiddleware({
      size: 100,
      ttl: 60 * 60 * 10, // 10 minutes
      clearOnMutation: true,
    }),
  ]);
}

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network: network(),
  store,
});
