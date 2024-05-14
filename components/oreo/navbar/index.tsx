import Link from 'next/link';
import SidePaneToggleButton from '../buttons/sidepaneToggle';
import UserOptionsButton from '../buttons/userOptions';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-green-500 p-2">
      <div className="flex items-center">
        <SidePaneToggleButton />
        <h1 className="ml-2 rounded-full bg-green-700 p-2 px-2.5 text-center text-2xl font-medium text-white dark:bg-green-600">
          <Link href={'/'}>Oreo</Link>
        </h1>
      </div>
      <div className="flex">
        <UserOptionsButton />
      </div>
    </nav>
  );
};

export default Navbar;
