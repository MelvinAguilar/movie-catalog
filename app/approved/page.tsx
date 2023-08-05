import { Footer, Movies, Navbar } from "@/components";
import { nunito } from "@/fonts";

export default function Approved() {
  return (
    <>
      <Navbar />
      <main className={`flex-1 bg-gray-800 ${nunito.className}`}>
        <h1 className="sr-only">Movie Catalog</h1>
        <Movies />
      </main>
      <Footer />
    </>
  );
}
