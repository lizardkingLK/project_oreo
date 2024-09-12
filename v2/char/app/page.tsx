import PageLayout from '@/components/layouts/page';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  return (
    <PageLayout
      classes={cn(
        'flex flex-col items-center justify-center space-y-4',
        'bg-gradient-to-r from-accent to-card'
      )}
    >
      <h1 className="text-4xl">Oreo</h1>
      <p>Chat With Your Friends.</p>
      <Link href={'/chat'} className={buttonVariants({ variant: 'secondary' })}>
        Chat Now
      </Link>
    </PageLayout>
  );
}
