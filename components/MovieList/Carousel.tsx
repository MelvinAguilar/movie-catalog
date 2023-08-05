"use client";

import React from "react";
import { Movie } from "@/types/Movie";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { MovieItem } from "..";

interface CarouselProps {
  movies: Movie[];
  startFrom: number;
}

const Carousel: React.FC<CarouselProps> = ({ movies, startFrom }) => {
  return (
    <div>
      <Splide
        options={{
          type: "slide",
          gap: "1rem",
          rewind: true,
          trimSpace: true,
          perPage: 5,
          perMove: 1,
          pagination: false,
          breakpoints: {
            640: {
              perPage: 1,
            },
            768: {
              perPage: 2,
            },
            1024: {
              perPage: 3,
            },
            1280: {
              perPage: 4,
            },
          },
        }}
      >
        {movies.slice(startFrom).map((movie: Movie, index: number) => (
          <SplideSlide key={index}>
            <MovieItem movie={movie} index={index} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;
