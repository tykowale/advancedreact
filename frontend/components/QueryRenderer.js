import { QueryRenderer } from 'react-relay';
import RelayEnvironment from '../src/relay/RelayEnvironment';

export default function MyQueryRenderer(props) {
  const { query, render, variables, environment = RelayEnvironment } = props;

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables || {}}
      render={render}
    />
  );
}
