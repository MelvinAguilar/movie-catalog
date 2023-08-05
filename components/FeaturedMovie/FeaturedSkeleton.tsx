import { Movie } from "@/types/Movie";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import { useGetGenresQuery } from "@/services/TMDB";
import { useDispatch, useSelector } from "react-redux";
import { Genre } from "@/types/Genre";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedSkeleton = () => {
  return (
    <div className=" right-gradient container relative grid w-full overflow-hidden md:aspect-video md:grid-cols-2">
      <div className="vertical-gradient | relative w-full md:absolute md:aspect-video">
        <Skeleton
          className="z-0 object-contain object-top opacity-80 md:absolute md:inset-0"
          height={1080}
        />
      </div>

      <div className="lateral-gradient | z-10 flex flex-col justify-center p-8">
        <Skeleton className="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl" />

        <Skeleton className="text-base" count={3} />

        <div className="mb-3 flex flex-row items-center">
          <Skeleton className="text-lg md:text-3xl" />

          <Skeleton className="ml-2" />
        </div>
        <div className="mb-3 flex flex-row items-center">
          <Skeleton className=" ml-2 font-normal" />
        </div>
        <Skeleton className=" ml-2 font-normal" />
      </div>
    </div>
  );
};

export default FeaturedSkeleton;
