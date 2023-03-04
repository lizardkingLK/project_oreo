import Layout from "@/components/layout";
import Image from "next/image";

export default function Profile() {
  return (
    <Layout>
      <main className="bg-black p-2">
        <div className="pt-8 pb-24" id="profile">
          <h1 className="text-xl text-white font-bold"># Profile</h1>
          <div className="flex justify-center">
            <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
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
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
