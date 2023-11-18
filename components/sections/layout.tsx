import { ISectionLayoutProps } from '@/types';
import React from 'react';
import ChevronBack from '../svgs/chevronBack';
import { sections } from '@/utils/enums';
import { useSection } from './store';

const SectionLayout = (props: ISectionLayoutProps) => {
  const setSection = useSection((state) => state.setSection);

  if (props) {
    const { title, isBackButton, children } = props;
    return (
      <section className="flex justify-center">
        <div
          className={
            'bg-stone-300 md:bg-transparent md:relative md:block container p-4'
          }
        >
          <div className="flex justify-between items-center">
            {title && (
              <h1 className="text-2xl text-black font-bold py-4" id="textTitle">
                {title}
              </h1>
            )}
            {isBackButton && (
              <button
                className="text-black hover:text-green-500"
                title="Home"
                onClick={() => setSection(sections.home)}
              >
                <ChevronBack />
              </button>
            )}
          </div>
          {children}
        </div>
      </section>
    );
  } else return null;
};

export default SectionLayout;
