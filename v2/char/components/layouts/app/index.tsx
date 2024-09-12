import { LayoutProps } from '@/app/layout';
import { ThemeProvider } from 'next-themes';
import React from 'react';

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default AppLayout;
