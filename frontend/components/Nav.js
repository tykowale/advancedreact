import { graphql } from 'react-relay';
import Link from 'next/link';
import QueryRenderer from './QueryRenderer';
import NavStyles from './styles/NavStyles';
import DisplayError from './ErrorMessage';

function Nav({ user }) {
  console.log(user);
  return (
    <NavStyles>
      <Link href="/products">products</Link>
      {user && (
        <>
          <Link href="/sell">sell</Link>
          <Link href="/orders">orders</Link>
          <Link href="/account">account</Link>
        </>
      )}

      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}

function renderQuery({ error, props }) {
  if (error) {
    console.log(error);
    return <DisplayError error={error} />;
  }
  if (props) {
    const { authenticatedItem: user } = props;
    return <Nav user={user} />;
  }
  return <div>Loading</div>;
}

const query = graphql`
  query NavQuery {
    authenticatedItem {
      ... on User {
        id
        name
        email
      }
    }
  }
`;

export default function NavContainer() {
  return <QueryRenderer query={query} render={renderQuery} />;
}
