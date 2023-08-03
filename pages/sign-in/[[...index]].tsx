import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="absolute top-1/2 left-1/2 -trangreen-x-1/2 -trangreen-y-1/2">
      <SignIn />
    </section>
  );
}
