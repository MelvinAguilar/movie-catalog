"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CarouselSkeletonProps {
  height?: number;
  numberOfSkeletons: number;
  onlyOneRow?: boolean;
}

const CarouselSkeleton: React.FC<CarouselSkeletonProps> = ({
  height = 165,
  numberOfSkeletons,
  onlyOneRow = true,
}) => {
  return (
    <div
      className={`grid justify-around gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
        onlyOneRow ? "grid-auto-flow" : ""
      }`}
    >
      {Array(numberOfSkeletons)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="relative aspect-video w-full max-w-[300px] rounded-md"
          >
            <Skeleton height={height} />
            {height === 165 && (
              <div className="absolute bottom-0 left-0 w-full p-3">
                <Skeleton />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CarouselSkeleton;
