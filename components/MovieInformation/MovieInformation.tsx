"use client";

import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdStarBorder,
  MdStar,
} from "react-icons/md";

import { MovieItem, MovieList, RatedCards } from "../index";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import genreIcons from "../../public/assets/genres/genresIcons";
import { RootState } from "@/store/ReduxStore";
import Link from "next/link";
import { Genre } from "@/types/Genre";
import { Credits } from "@/types/Credits";
import { Movie } from "@/types/Movie";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { rajdhani } from "@/fonts";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface MovieInformationProps {
  movieId: number;
}

const MovieInformation: React.FC<MovieInformationProps> = ({ movieId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const [sessionId] = useLocalStorage("session_id", "");

  const { data, error, isFetching } = useGetMovieQuery(movieId);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId,
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId,
    page: 1,
  });
  const { data: recommendations } = useGetRecommendationsQuery({
    list: "/recommendations",
    movie_id: movieId,
  });

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: movieId,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie: Movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie: Movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <div className="movie-info-gradient | container w-full md:relative md:aspect-video md:h-screen 2xl:h-auto">
        <div className="vertical-gradient | relative w-full md:absolute md:aspect-video md:h-screen 2xl:h-auto">
          {data?.backdrop_path ? (
            <Image
              alt={data.title}
              src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
              width={1920}
              height={1080}
              className="z-0 object-contain object-top opacity-70 md:absolute md:inset-0 md:h-full md:w-full md:object-cover"
            />
          ) : isFetching ? (
            <Skeleton height={1080} width={1920} />
          ) : (
            <div className="py-7" />
          )}
        </div>
        <div className="z-10 flex h-full w-full flex-col justify-center p-8 md:absolute">
          <div className="flex justify-center gap-4">
            <p>
              {data?.release_date.split("-")[0] ||
                (isFetching && <Skeleton width={20} />)}
            </p>

            <span aria-hidden="true">|</span>
            <p>
              {!isFetching && "IMDB "}

              <span className="font-bold">
                {data?.vote_average || (isFetching && <Skeleton width={20} />)}
              </span>
            </p>
          </div>

          <h2
            className={`my-3 text-center text-3xl font-medium uppercase tracking-wider lg:text-5xl ${rajdhani.className}`}
          >
            {data?.title ||
              (isFetching && (
                <Skeleton width={200} className="text-3xl lg:text-5xl" />
              ))}
          </h2>
          <ul role="list" className="flex flex-wrap justify-center gap-4">
            {data?.genres?.map((genre: Genre) => (
              <li key={genre.id} className="mb-1" role="listitem">
                <Link
                  href={`/genre?genreId=${genre.id}&page=1`}
                  className="inline-flex flex-row items-center text-left text-white hover:text-gray-400"
                >
                  <Image
                    src={
                      genreIcons[genre.name.toLowerCase()] || "/bluelogo.png"
                    }
                    alt=""
                    width={15}
                    height={15}
                    className="dark:filter-invert mr-4"
                  />
                  {genre?.name}
                </Link>
              </li>
            )) ||
              (isFetching && (
                <Skeleton width={100} height={20} className="mr-4" />
              ))}
          </ul>
        </div>
      </div>

      {/* Controls */}
      <div className="container flex flex-wrap justify-between gap-4 p-6 md:p-8">
        <div className="flex gap-4">
          {(data?.homepage && (
            <a
              className="transition hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
              href={data?.homepage}
            >
              Website
            </a>
          )) ||
            (isFetching && <Skeleton width={100} />)}
          <span aria-hidden="true">|</span>
          {(data?.imdb_id && (
            <a
              className="transition hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/title/${data?.imdb_id}`}
            >
              IMDB
            </a>
          )) || <Skeleton width={50} />}
          <span aria-hidden="true">|</span>
          {(data?.videos?.results?.length > 0 && (
            <a
              className="transition hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            >
              Trailer on YouTube
            </a>
          )) ||
            (isFetching && <Skeleton width={200} />)}
        </div>
        <div className="flex">
          <button
            type="button"
            className="flex items-center gap-2 rounded-l bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-700"
            onClick={addToFavorites}
          >
            {isMovieFavorited ? (
              <>
                <MdFavorite aria-hidden="true" />
                <span className="sr-only">Remove from favorites</span>
              </>
            ) : (
              <>
                <MdFavoriteBorder aria-hidden="true" />
                <span className="sr-only">Add to favorites</span>
              </>
            )}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-r bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-700"
            onClick={addToWatchList}
          >
            {isMovieWatchlisted ? (
              <>
                <MdStar aria-hidden="true" />
                <span className="sr-only">Remove from watchlist</span>
              </>
            ) : (
              <>
                <MdStarBorder />
                <span className="sr-only">Add to watchlist</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Overview section */}
      <div className="container p-6 md:p-8">
        <h2 className="my-4 text-2xl font-medium text-blue-500">Overview</h2>
        <p>{data?.overview || (isFetching && <Skeleton count={5} />)}</p>
        <h2 className="my-4 text-2xl font-medium text-blue-500">Top Cast</h2>
        <div className="grid md:grid-cols-[auto_auto]">
          <ul className="flex flex-row flex-wrap justify-center gap-4 md:justify-start">
            {(data &&
              data?.credits?.cast
                ?.map(
                  (character: Credits) =>
                    character.profile_path && (
                      <li key={character.id}>
                        <Link
                          href={`/actors/${character.id}`}
                          className="flex flex-col items-center"
                        >
                          <Image
                            src={`https://image.tmdb.org/t/p/w200/${character.profile_path}`}
                            alt={character.name}
                            width={85}
                            height={127}
                            className="mb-2 rounded-md"
                          />
                          <p className="font-bold text-white">
                            {character?.name}
                          </p>
                          <p className="text-gray-200">
                            {character.character.split("/")[0]}
                          </p>
                        </Link>
                      </li>
                    )
                )
                .slice(0, 6)) ||
              (isFetching && <Skeleton count={6} />)}
          </ul>
          <div>
            {(data?.poster_path && (
              <Image
                alt={data.title}
                src={`https://image.tmdb.org/t/p/w300/${data?.poster_path}`}
                width={288}
                height={450}
                className="mx-auto mt-4 w-52 rounded-md md:mr-0 md:mt-0 md:w-72"
              />
            )) ||
              (isFetching && <Skeleton width={300} height={450} />)}
          </div>
        </div>

        {recommendations ? (
          <RatedCards title="Similar Movies" movies={recommendations} />
        ) : (
          <p>Sorry, nothing was found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieInformation;
