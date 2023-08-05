import { Movie } from "@/types/Movie";
import React from "react";
import { MovieItem } from "..";
import Carousel from "../MovieList/Carousel";

interface RatedCardsProps {
  title: string;
  movies: { results: Movie[] };
}

const RatedCards: React.FC<RatedCardsProps> = ({ title, movies }) => {
  if (!movies.results.length) return null;

  return (
    <div>
      <h2 className="mb-4 mt-14 text-2xl  font-medium text-blue-500">
        {title}
      </h2>
      <Carousel movies={movies.results} startFrom={1} />
    </div>
  );
};

export default RatedCards;
