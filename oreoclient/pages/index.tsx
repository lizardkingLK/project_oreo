import Layout from "@/components/layout";
import Image from "next/image";
// import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <main className="bg-black p-2">
        <div className="flex py-14 pb-32">
          <div className="basis-2/4 bg-gradient-to-r from-green-500 to-green-300">
            <h1 className="text-9xl font-black ">
              One of the Shopping Stores.
            </h1>
            <blockquote className="mx-2 font-bold">
              Browse, Buy, Deliver T-Shirts.
            </blockquote>
          </div>
          <div className="basis-2/4 border-2 flex justify-center content-center">
            <Image
              width={387}
              height={387}
              src={"/logo.png"}
              alt={"hero logo"}
            />
          </div>
        </div>
        <div className="pt-8 pb-16" id="browse">
          <h1 className="text-5xl text-white"># Browse</h1>
          <div className="flex justify-center">
            <div className="pt-16 grid grid-cols-4 xs:grid-cols-2 gap-4 justify-center">
              {Array(7)
                .fill(1)
                .map((v, i) => (
                  <a key={i} href={"/design/" + (i + 1)}>
                    <Image
                      className="border-2 hover:border-green-500"
                      width={200}
                      height={200}
                      src={"/logo.png"}
                      alt={v}
                    />
                  </a>
                ))}
              <div className="flex flex-wrap justify-center content-center border-2 hover:border-green-500">
                <a href="/design/create">
                  <h1
                    className="text-8xl font-black text-white hover:text-green-500"
                    title="Add More"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </h1>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
