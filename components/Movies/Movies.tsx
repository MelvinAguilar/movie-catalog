"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";

import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import { RootState } from "@/store/ReduxStore";
import { FeaturedMovie, Pagination } from "..";
import MovieSkeleton from "../MovieItem/MovieSkeleton";
import CarouselSkeleton from "../MovieList/CarouselSkeleton";
import FeaturedSkeleton from "../FeaturedMovie/FeaturedSkeleton";
import CatalogCarousel from "../CatalogCarousel/CatalogCarousel";
import GenreList from "../GenreList/GenreList";

const Movies = () => {
  const [page, setPage] = useState(1);

  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state: RootState) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <>
        <FeaturedSkeleton />
        <div className="container p-6 md:p-8">
          <CatalogCarousel />
        </div>
      </>
    );
  }

  if (data && !data.results.length) {
    return <p>No movies found</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <FeaturedMovie movie={data.results[0]} />

      <div className="container p-6 md:p-8">
        <CatalogCarousel />
      </div>
    </>
  );
};

export default Movies;
