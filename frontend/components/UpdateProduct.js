import { useRouter } from 'next/router';
import { useState } from 'react';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { commit } from '../src/mutations/UpdateProduct';
import useForm from '../lib/useForm';

export default function UpdateProduct({ product }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { inputs, handleChange, clearForm } = useForm(product);

  async function handleSubmit(e) {
    setLoading(true);
    try {
      e.preventDefault();
      const { updateProduct } = await commit({
        ...inputs,
      });

      clearForm();
      setError(null);
      await router.push({
        pathname: `/product/${updateProduct.id}`,
      });
    } catch (err) {
      console.error(err);
      setError({ message: err.message });
    }
    setLoading(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
