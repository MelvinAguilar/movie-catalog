import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Movie } from "../../types/Movie";

interface MovieProps {
  movie: Movie;
  index: number;
}

const MovieItem: React.FC<MovieProps> = ({ movie, index }) => {
  return (
    <div className="movie-item movie-gradient | relative mx-auto w-fit overflow-hidden rounded-md">
      <Image
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            : "/no-image.png"
        }
        alt={movie.title}
        width={300}
        height={168}
        className="movie-image | aspect-video bg-white object-contain opacity-70 drop-shadow-md transition"
      />

      <div className="absolute bottom-0 left-0 z-10 w-full p-3">
        <h3 className="max-w-[277px] overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold">
          {movie.title}
        </h3>
      </div>
      <Link href={`/movie/${movie.id}`} className="absolute inset-0 z-30">
        <span className="sr-only">More details about {movie.title}</span>
      </Link>
    </div>
  );
};

export default MovieItem;
