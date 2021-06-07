import { useState } from 'react';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { commit } from '../src/mutations/SignUp';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [user, setUser] = useState(null);
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  async function handleSubmit(e) {
    setLoading(true);
    try {
      e.preventDefault();
      const { createUser } = await commit(inputs);
      setUser(createUser);
      resetForm();
    } catch (err) {
      console.error(err);
      setError({ message: err.message });
    }
    setLoading(false);
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {user && <p>Signed up with {user.email} please log in</p>}
        <label htmlFor="name">
          Name
          <input
            type="name"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

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

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
