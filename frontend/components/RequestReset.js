import { useState } from 'react';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { commit } from '../src/mutations/RequestReset';

export default function RequestReset() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  async function handleSubmit(e) {
    setLoading(true);
    try {
      e.preventDefault();
      const { code } = await commit(inputs);
      setSuccess(code == null);
      resetForm();
    } catch (err) {
      console.error(err);
      setError({ message: err.message });
    }
    setLoading(false);
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request Password Reset</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {success && <p>Password Reset Successful! Check email for link</p>}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
