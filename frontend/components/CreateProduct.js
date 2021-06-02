import { useState } from 'react';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { commit } from '../src/mutations/CreateProduct';
import DisplayError from './ErrorMessage';

export default function CreateProduct() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { inputs, handleChange, clearForm } = useForm({
    image: '',
    name: '',
    price: '',
    description: '',
  });

  async function handleSubmit(e) {
    setLoading(true);
    try {
      e.preventDefault();
      const { createProduct } = await commit({
        ...inputs,
        photo: {
          create: {
            image: inputs.image,
            altText: inputs.name,
          },
        },
      });

      clearForm();
      setError(null);
      await router.push({
        pathname: `/product/${createProduct.id}`,
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
        <label htmlFor="image">
          image
          <input required type="file" id="image" name="image" onChange={handleChange} />
        </label>
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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
