import SidePaneToggleButton from '../buttons/sidepaneToggle';
import UserOptionsButton from '../buttons/userOptions';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-green-500 p-2">
      <div className="flex items-center">
        <SidePaneToggleButton />
        <h1 className="ml-2 text-2xl font-bold">Oreo</h1>
      </div>
      <div className="flex">
        <UserOptionsButton />
      </div>
    </nav>
  );
};

export default Navbar;
