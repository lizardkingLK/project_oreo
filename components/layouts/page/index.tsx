import IconButton from '@/components/buttons/iconButton';
import Bars from '@/components/svgs/bars';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { MouseEvent, ReactNode, useState } from 'react';
import useSidePane from './store';
import { classNames } from '@/utils/helpers';

const UserOptions = () => {
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
      <IconButton
        color={'bg-green-400'}
        width={'w-10'}
        height={'h-10'}
        text={'text-white'}
        font={'font-bold'}
        title={'Click To Join'}
        clickEvent={() => {}}
      >
        <h1 className="text-lg font-bold">⚡</h1>
      </IconButton>
    </Link>
  );
};

const Navbar = () => {
  const { sidepane, toggle } = useSidePane();

  return (
    <nav className="flex items-center justify-between bg-green-500 p-2">
      <div className="flex items-center">
        <IconButton
          color={'transparent'}
          width={'w-10'}
          height={'h-10'}
          text={'text-white'}
          font={'font-bold'}
          title={'Toggle Pane'}
          clickEvent={() => toggle({ sidepane: !sidepane })}
        >
          <Bars />
        </IconButton>
        <h1 className="text-2xl font-bold">Oreo</h1>
      </div>
      <div className="flex">
        <UserOptions />
      </div>
    </nav>
  );
};

const SidePane = () => {
  return (
    <div className="p-2">
      <h1>sidepane</h1>
    </div>
  );
};

const PageLayout = (props: { children: ReactNode }) => {
  const { sidepane } = useSidePane();

  // TODO: Add toggle to sidepane place it to the left of brand in navbar
  // TODO: when in mobile hide side pane totally yet set toggleble
  // TODO: when in mobile once clicked on an item in chat link sidepane toggles to false
  // TODO: yellow has chat messages screen
  // TODO: yellow has bot default as idle

  return (
    <div className="bg:white font-Poppins text-black dark:bg-black dark:text-white">
      <section className="flex min-h-screen text-black">
        {sidepane && (
          <div className={'w-2/12 bg-green-400'}>
            <SidePane />
          </div>
        )}
        <div
          className={classNames(
            sidepane ? 'w-10/12' : 'w-full',
            'bg-yellow-400'
          )}
        >
          <Navbar />
          {props.children}
        </div>
      </section>
    </div>
  );
};

export default PageLayout;
