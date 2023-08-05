"use client";

import React from "react";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import genreIcons from "@/public/assets/genres/genresIcons";
import { Genre } from "@/types/Genre";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/ReduxStore";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";

interface GenreCarouselProps {
  genres: Genre[];
}

const GenreCarousel: React.FC<GenreCarouselProps> = ({ genres }) => {
  return (
    <div>
      <Splide
        options={{
          type: "slide",
          gap: "1rem",
          autoWidth: true,
          rewind: true,
          perPage: 1,
          perMove: 1,
          pagination: false,
        }}
      >
        {genres.map((genre) => (
          <SplideSlide key={genre.id}>
            <div className="relative flex h-20 w-32 flex-col  items-center justify-center rounded-md bg-slate-900 shadow-md">
              <Image
                src={genreIcons[genre.name.toLowerCase()] || "/bluelogo.png"}
                alt=""
                width={15}
                height={15}
                className="dark:filter-invert"
              />
              <p className="mt-1 text-xs">{genre.name}</p>

              <Link
                href={`/genre?genreId=${genre.id}&page=1`}
                className="absolute inset-0"
              >
                <span className="sr-only">Show movies in {genre.name}</span>
              </Link>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default GenreCarousel;
