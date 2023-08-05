"use client";

import { useGetActorQuery, useGetMoviesByActorIdQuery } from "@/services/TMDB";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Pagination, MovieList } from "..";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ActorInformationProps {
  actorId: number;
}

const ActorInformation: React.FC<ActorInformationProps> = ({ actorId }) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorQuery(actorId);
  const { data: movies } = useGetMoviesByActorIdQuery({ actorId, page });

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <div className="container mt-20 grid w-full flex-wrap items-center justify-center gap-8 p-6 md:grid-cols-[auto_auto] md:p-8">
        {(data?.profile_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
            width={200}
            height={300}
            className="rounded-md drop-shadow-md"
          />
        )) ||
          (isFetching && <Skeleton width={200} height={300} />)}
        <div>
          <h2 className="text-3xl font-bold text-blue-500">
            {data?.name || (isFetching && <Skeleton width={500} />)}
          </h2>
          <p className="mb-3 mt-2 text-lg">
            {isFetching ? (
              <Skeleton />
            ) : (
              <>
                <span className="font-bold text-gray-500">Born: </span>
                {new Date(data?.birthday).toDateString()}
              </>
            )}
          </p>

          <p>
            {isFetching ? (
              <Skeleton count={5} />
            ) : data?.biography ? (
              data?.biography
            ) : (
              "No biography available"
            )}
          </p>

          <div className="flex flex-wrap gap-6 py-4">
            {(data?.imdb_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/name/${data?.imdb_id}`}
                className="text-blue-500 hover:text-blue-600"
              >
                IMDB
              </a>
            )) ||
              (isFetching && <Skeleton />)}

            {isFetching ? (
              <Skeleton />
            ) : (
              <>
                <span className="sr-only">|</span>
                <button onClick={() => router.back()}>Back</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container p-6 md:p-8">
        {!isFetching && (
          <h3 className="text-2xl font-medium text-blue-500">Movies</h3>
        )}

        <div>
          {movies ? (
            <>
              <MovieList movies={movies} numberOfMovies={12} />
              <Pagination
                isRouter={false}
                genreId={""}
                page={page}
                totalPages={movies?.total_pages}
                setPage={setPage}
              />
            </>
          ) : (
            <p>Sorry, nothing was found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ActorInformation;
