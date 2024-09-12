'use client';

import { Button } from '../ui/button';
import { UserIcon } from 'lucide-react';

export function SignInButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => console.log('clicked sign in...')}
    >
      <UserIcon className="h-4 w-4" />
    </Button>
  );
}
