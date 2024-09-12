import { LayoutProps } from '@/app/layout';
import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';
import React from 'react';

type PageLayoutProps = LayoutProps & { classes?: string };

const PageLayout = ({ children, classes }: PageLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className={cn('h-[calc(94vh)]', classes)}>{children}</main>
    </>
  );
};

export default PageLayout;
