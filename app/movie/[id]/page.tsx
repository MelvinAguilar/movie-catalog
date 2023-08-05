import { Navbar, MovieInformation, Footer } from "@/components";
import { nunito } from "@/fonts";

export default function MoviePage({
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
        <MovieInformation movieId={parseInt(params.id)} />
      </main>
      <Footer />
    </>
  );
}
