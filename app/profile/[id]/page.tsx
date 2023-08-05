import { Footer, Navbar, Profile } from "@/components";
import { nunito } from "@/fonts";

export default function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <>
      <Navbar />
      <main className={`bg-gray-800 flex-1 ${nunito.className}`}>
        <Profile />
      </main>
      <Footer />
    </>
  );
}
