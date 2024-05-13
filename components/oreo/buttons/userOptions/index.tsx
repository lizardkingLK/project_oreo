import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import JoinButton from '../joinButton';

const UserOptionsButton = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <UserButton
      afterSignOutUrl="/"
      userProfileMode="modal"
      appearance={{
        elements: {
          avatarImage: 'w-10 h-10',
          avatarBox: 'w-10 h-10',
        },
      }}
    />
  ) : (
    <Link href="/sign-up">
      <JoinButton />
    </Link>
  );
};

export default UserOptionsButton;
