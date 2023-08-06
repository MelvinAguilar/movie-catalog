import React from "react";

interface GenreListProps {
  genreId: number | string;
  searchQuery: string;
}

import { useGetGenresQuery } from "@/services/TMDB";
import GenreCarousel from "./GenreCarousel";

const GenreList: React.FC<GenreListProps> = ({ genreId, searchQuery }) => {
  const { data, isFetching } = useGetGenresQuery("");

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className="my-4 text-2xl font-medium text-blue-500">Genre List</h2>
      <GenreCarousel genres={data.genres} />

      <h2 className="mt-14 text-2xl font-medium text-blue-500">
        {searchQuery
          ? "Search Results"
          : isNaN(Number(genreId)) && typeof genreId === "string"
          ? genreId.charAt(0).toUpperCase() + genreId.slice(1)
          : data.genres.find(
              (genre: { id: number }) => genre.id === Number(genreId)
            )?.name}
      </h2>
    </>
  );
};

export default GenreList;
