import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [isCartOpen, setCartOpen] = useState(false);

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  function toggleCart() {
    setCartOpen(!isCartOpen);
  }

  return (
    <LocalStateProvider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  return useContext(LocalStateContext);
}

export { CartStateProvider, useCart };
