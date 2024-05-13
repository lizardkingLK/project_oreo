import { classNames } from '@/utils/helpers';
import SidePane, { useSidePane } from '@/components/oreo/sidepane';
import { ReactNode } from 'react';
import Navbar from '../../navbar';

const PageLayout = (props: { children: ReactNode }) => {
  const { sidepane } = useSidePane();

  // TODO: Add toggle to sidepane place it to the left of brand in navbar
  // TODO: when in mobile hide side pane totally yet set toggleble
  // TODO: when in mobile once clicked on an item in chat link sidepane toggles to false
  // TODO: yellow has chat messages screen
  // TODO: yellow has bot default as idle

  return (
    <div className="bg:white font-Poppins text-black dark:bg-black dark:text-white">
      <section className="flex min-h-screen">
        {sidepane && (
          <div className={'w-2/12'}>
            <SidePane />
          </div>
        )}
        <div
          className={classNames(sidepane ? 'w-10/12' : 'w-full', 'bg-gray-800')}
        >
          <Navbar />
          {props.children}
        </div>
      </section>
    </div>
  );
};

export default PageLayout;
