import Hero from "@/components/home/Hero";
import Link from "next/link";

export default async function Items() {

  // const data = await fetchItems(); // Fetches 20 items by default
  return (
    <main className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto min-h-screen px-4">
      <Hero/>
    </main>
  );
}
