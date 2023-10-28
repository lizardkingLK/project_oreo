import Link from 'next/link';
import React from 'react';

const Welcome = () => {
  return (
    <section
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      id="divWelcome"
    >
      <div className="text-black font-black text-center">
        <span className="text-transparent text-8xl md:text-9xl bg-clip-text bg-green-600">
          OREO
        </span>
        <br />
        <span className="text-xl tracking-normal md:tracking-widest text-stone-600">
          A Chat Application
        </span>
        <br />
        <div className="mt-4 flex justify-evenly">
          <Link href="/sign-up">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              JOIN
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
