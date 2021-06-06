import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { commit } from '../src/mutations/SignIn';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
  });

  async function handleSubmit(e) {
    setLoading(true);
    try {
      e.preventDefault();
      const { authenticateUserWithPassword } = await commit({
        ...inputs,
      });

      if (authenticateUserWithPassword?.code) {
        setError({ message: authenticateUserWithPassword.message });
      } else {
        window.location = '/';
      }
    } catch (err) {
      console.error(err);
      setError({ message: err.message });
    }
    setLoading(false);
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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

        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
