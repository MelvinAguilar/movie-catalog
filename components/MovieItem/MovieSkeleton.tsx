import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface MovieSkeletonProps {
  numberOfSkeletons: number;
}

const MovieSkeleton: React.FC<MovieSkeletonProps> = ({ numberOfSkeletons }) => {
  return (
    <>
      {Array(numberOfSkeletons)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="relative aspect-video w-full max-w-[300px] rounded-md"
          >
            <Skeleton height={165} />
            <div className="absolute bottom-0 left-0 w-full p-3">
              <Skeleton />
            </div>
          </div>
        ))}
    </>
  );
};

export default MovieSkeleton;
