import { Navbar, MovieInformation, Sidebar, Footer } from "@/components";
import Genres from "@/components/Genres/Genres";
import { nunito } from "@/fonts";

export default function GenrePage({
  searchParams,
}: {
  searchParams: {
    genreId: string;
    page: string;
    search: string;
  };
}) {
  return (
    <>
      <Navbar />
      <main className={`flex-1 bg-gray-800 ${nunito.className}`}>
        <h1 className="sr-only">Genre Page</h1>
        <Genres
          genreId={searchParams.genreId}
          pageId={parseInt(searchParams.page)}
        />
      </main>
      <Footer />
    </>
  );
}
