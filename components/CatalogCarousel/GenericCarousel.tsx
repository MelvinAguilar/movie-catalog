"use client";

import React, { useState } from "react";
import { useGetMoviesQuery } from "../../services/TMDB";
import Carousel from "../MovieList/Carousel";
import CarouselSkeleton from "../MovieList/CarouselSkeleton";

interface GenericCarouselProps {
  genreIdOrCategoryName: string;
}

const GenericCarousel: React.FC<GenericCarouselProps> = ({
  genreIdOrCategoryName,
}) => {
  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName: genreIdOrCategoryName,
    page,
    searchQuery: "",
  });

  if (isFetching) {
    return <CarouselSkeleton numberOfSkeletons={6} />;
  }

  if (data && !data.results.length) {
    return <p>No movies found</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return <Carousel movies={data.results} startFrom={1} />;
};

export default GenericCarousel;
