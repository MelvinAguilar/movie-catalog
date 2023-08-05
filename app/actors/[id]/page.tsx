import { Navbar, ActorInformation, Footer } from "@/components";
import { nunito } from "@/fonts";

export default function ActorPage({
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
        <ActorInformation actorId={parseInt(params.id)} />
      </main>
      <Footer />
    </>
  );
}
