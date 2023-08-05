import { Movie } from "@/types/Movie";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import { useGetGenresQuery } from "@/services/TMDB";
import { useDispatch, useSelector } from "react-redux";
import { Genre } from "@/types/Genre";
import genreIcons from "@/public/assets/genres/genresIcons";
import { RootState } from "@/store/ReduxStore";

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetGenresQuery("");

  if (!movie) return null;

  return (
    <div className="right-gradient container relative grid w-full md:aspect-video md:grid-cols-2">
      <div className="vertical-gradient | relative w-full md:absolute md:aspect-video">
        <Image
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          width={1920}
          height={1080}
          className=" z-0 object-contain object-top opacity-80 md:absolute md:inset-0"
        />
        <a
          href="#movie-list"
          aria-label="Scroll down to movie list"
          className="absolute bottom-28 right-7 z-10"
        >
          <Image
            alt=""
            src="/down-arrow.png"
            width={40}
            height={40}
            className="filter-invert"
          />
        </a>
      </div>

      <div className="lateral-gradient | z-10 flex flex-col justify-center p-8">
        <h2 className="text-2xl font-bold tracking-wider md:text-3xl lg:text-5xl">
          {movie.title}
        </h2>
        <p className="my-4 text-base">{movie.overview.split(".")[0]}.</p>

        <div className="mb-3 flex flex-row items-center">
          <p className=" text-lg font-bold text-blue-700 md:text-3xl">
            {movie.vote_average}
            <span className="ml-2 text-base font-normal text-white">/ 10</span>
          </p>
          <p className="ml-2 text-base font-normal text-white">
            ◦ {movie.release_date.split("-")[0]}
          </p>
        </div>
        <div className="mb-3 flex flex-row items-center">
          <ul role="list" className="flex flex-row flex-wrap gap-3">
            {isFetching ? (
              <p>Loading...</p>
            ) : (
              movie.genre_ids.map((genreId) => {
                const genre = data?.genres.find(
                  (genre: Genre) => genre.id === genreId
                );

                if (!genre) return null;

                return (
                  <li key={genre.id} role="listitem">
                    <Link
                      href={`/genre?genreId=${genre.id}&page=1`}
                      className="block rounded-full bg-slate-600/50 px-4 py-2 text-gray-200 transition hover:text-gray-400"
                    >
                      {genre.name}
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        <Link
          className="w-fit text-blue-500 transition hover:text-blue-300"
          href={`/movie/${movie.id}`}
          passHref
        >
          More info
        </Link>
      </div>
    </div>
  );
};

export default FeaturedMovie;
