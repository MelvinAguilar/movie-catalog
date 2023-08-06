"use client";

import React, { useState, useEffect } from "react";
import GenreList from "../GenreList/GenreList";
import { useSelector } from "react-redux";
import { MovieList, Pagination } from "..";
import { RootState } from "@/store/ReduxStore";
import { useGetMoviesQuery } from "@/services/TMDB";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CarouselSkeleton from "../MovieList/CarouselSkeleton";
import CatalogCarousel from "../CatalogCarousel/CatalogCarousel";
import SearchBar from "../SearchBar";

interface GenresProps {
  genreId: string;
  pageId: number;
}

const Genres: React.FC<GenresProps> = ({ genreId, pageId }) => {
  const [page, setPage] = useState(pageId);

  const { searchQuery, page: reduxPage } = useSelector(
    (state: RootState) => state.currentGenreOrCategory
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName: isNaN(Number(genreId)) ? genreId : Number(genreId),
    page: page ? (searchQuery ? reduxPage : page) : 1,
    searchQuery,
  });

  if (isFetching) {
    return (
      <div className="container mt-20 p-6 md:p-8">
        <Skeleton className="mb-5 mt-4 text-2xl" width={200} />
        <CarouselSkeleton numberOfSkeletons={6} height={75} />
        <Skeleton className="mb-14 mt-8 text-2xl" width={200} />
        <CarouselSkeleton numberOfSkeletons={20} onlyOneRow={false} />
      </div>
    );
  }

  return (
    <>
      <div className="container mt-20 p-6 md:p-8">
        <GenreList genreId={genreId} searchQuery={searchQuery} />
        <SearchBar />
        <MovieList movies={data} numberOfMovies={20} />
        <Pagination
          genreId={genreId}
          page={page}
          totalPages={data.total_pages}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default Genres;
