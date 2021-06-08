import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ReactRelayContext } from 'react-relay';

import Page from '../components/Page';
import RelayEnvironment from '../src/relay/RelayEnvironment';

export default function App({ Component, pageProps }) {
  return (
    <ReactRelayContext.Provider value={{ environment: RelayEnvironment, variables: {} }}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ReactRelayContext.Provider>
  );
}
