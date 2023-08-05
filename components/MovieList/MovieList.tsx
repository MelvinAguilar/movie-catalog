import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import { Movie } from "../../types/Movie";

interface MovieListProps {
  movies: { results: Movie[] };
  numberOfMovies: number;
}

const MovieList: React.FC<MovieListProps> = ({ movies, numberOfMovies }) => {
  return (
    <div>
      <ul
        role="list"
        className="grid justify-around gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {movies.results.map((movie, index) => {
          return (
            <li key={movie.id} role="listitem" className="mt-4">
              <MovieItem movie={movie} index={index} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
