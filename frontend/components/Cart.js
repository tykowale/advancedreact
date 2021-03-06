import { graphql } from 'react-relay';
import CartStyles from './styles/CartStyles';
import DisplayError from './ErrorMessage';
import QueryRenderer from './QueryRenderer';
import Supreme from './styles/Supreme';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import CloseButton from './styles/CloseButton';

function Cart({ user }) {
  const { isCartOpen, closeCart } = useCart();
  if (user == null) {
    return null;
  }
  return (
    <CartStyles open={isCartOpen}>
      <header>
        <Supreme>{user.name}&apos;s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      ;
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
      ;
    </CartStyles>
  );
}

const query = graphql`
  query CartQuery {
    authenticatedItem {
      ... on User {
        email
        name
        cart {
          id
          quantity
          product {
            id
            name
            price
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export default function CartContainer() {
  const renderQuery = ({ error, props }) => {
    if (error) {
      console.log(error);
      return <DisplayError error={error} />;
    }
    if (props) {
      const { authenticatedItem: user } = props;
      return <Cart user={user} />;
    }
    return <div>Loading</div>;
  };

  return <QueryRenderer query={query} render={renderQuery} />;
}
