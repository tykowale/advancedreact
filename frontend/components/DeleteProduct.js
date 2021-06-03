import { useState } from 'react';
import styled from 'styled-components';
import { commit } from '../src/mutations/DeleteProduct';

const ButtonStyled = styled.button`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default function DeleteProduct({ id, children }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const { deleteProduct } = await commit({ id });
        console.log({ deleteProduct });
      } catch (e) {
        alert(e.message);
      }
    }
    setLoading(false);
  }

  return (
    <ButtonStyled type="button" onClick={handleClick} disabled={loading}>
      {children}
    </ButtonStyled>
  );
}
