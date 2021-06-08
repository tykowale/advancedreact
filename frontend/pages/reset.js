import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import ResetPassword from '../components/ResetPassword';

export default function ResetPage() {
  const router = useRouter();
  const { token } = router.query;

  if (token == null) {
    return <RequestReset />;
  }

  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
}
