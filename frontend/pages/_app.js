import { ReactRelayContext } from 'react-relay';

import Page from '../components/Page';
import RelayEnvironment from '../src/relay/RelayEnvironment';

export default function MyApp({ Component, pageProps }) {
  return (
    <ReactRelayContext.Provider value={{ environment: RelayEnvironment, variables: {} }}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ReactRelayContext.Provider>
  );
}
