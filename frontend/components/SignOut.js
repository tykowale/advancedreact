import { signOut } from '../src/mutations/SignOut';

export default function SignOut() {
  async function handleClick() {
    await signOut();
    window.location = '/';
  }

  return (
    <button type="button" onClick={handleClick}>
      Sign Out
    </button>
  );
}
