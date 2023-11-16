import React, { Fragment } from 'react';
import { ILayoutProps } from '@/types';
import Bars from './svgs/bars';
import Welcome from './welcome';
import Head from 'next/head';
import { useNavbar } from './navs/user/store';

const LayoutSwitch = (props: ILayoutProps) => {
  const navbar = useNavbar((state) => state.navbar);
  const setNavbar = useNavbar((state) => state.setNavbar);
  const { isSignedIn, rootElementId, titleData } = props;

  return (
    <Fragment>
      <Head>
        <title>Oreo {titleData}</title>
      </Head>
      <div className="container">
        <main className="min-h-screen" id={rootElementId}>
          <div className="absolute z-10 block md:flex items-center p-4 border-stone-900">
            <div className="basis-1/4 flex justify-between md:justify-start items-center my-4 md:m-0">
              {isSignedIn && (
                <button
                  id="btnToggleNavbar"
                  className="mr-4 md:mr-2 text-black hover:text-white"
                  onClick={() => setNavbar(true)}
                >
                  <Bars />
                </button>
              )}
              {!navbar && (
                <h1 className="text-3xl text-center md:text-left text-black font-bold">
                  OREO
                </h1>
              )}
            </div>
          </div>
          {props.isSignedIn ? props.children : <Welcome />}
        </main>
      </div>
    </Fragment>
  );
};

export default LayoutSwitch;
