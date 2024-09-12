'use client';

import { ChatScreenSection } from '@/components/chat/screen';
import { ChatSidebarSection } from '@/components/chat/sidebar';
import PageLayout from '@/components/layouts/page';

export default function Home() {
  return (
    <PageLayout classes="flex items-center">
      <ChatSidebarSection />
      <ChatScreenSection />
    </PageLayout>
  );
}
