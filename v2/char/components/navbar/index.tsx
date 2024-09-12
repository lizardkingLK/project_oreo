'use client';

import React from 'react';
import { ThemeSwitch } from '../themes/ThemeSwitch';
import { SignInButton } from '../signin';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { useSidebarStore } from '../chat/sidebar/state';

const Navbar = () => {
  const { toggleVisible } = useSidebarStore((state) => state);

  return (
    <nav className="mx-4 flex h-[calc(6vh)] items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button size={'icon'} variant="ghost" onClick={toggleVisible}>
          <Menu className="h-4 w-4" />
        </Button>
        <Link href="/">
          <h1 className="font-black">Oreo</h1>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeSwitch />
        <SignInButton />
      </div>
    </nav>
  );
};

export default Navbar;
