"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useGetGenresQuery } from "@/services/TMDB";
import genreIcons from "@/public/assets/genres/genresIcons";

import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/ReduxStore";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

interface Genre {
  id: number;
  name: string;
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetGenresQuery("");
  const { genreIdOrCategoryName } = useSelector(
    (state: RootState) => state.currentGenreOrCategory
  );

  return (
    <aside className="sidebar | auto fixed left-0 top-16 h-screen w-60 overflow-y-auto bg-gray-900 text-white">
      <nav>
        <p className="ml-3 mt-8">Categories</p>
        <ul role="list" className="mt-2">
          {categories.map(({ label, value }) => (
            <li key={value} className="mb-1" role="listitem">
              <Link
                href={`/`}
                onClick={() => dispatch(selectGenreOrCategory(value))}
                className="inline-flex w-full items-center px-3 py-2.5 text-left text-gray-200 hover:bg-gray-700 hover:text-gray-400"
              >
                <Image
                  src={genreIcons[label.toLowerCase()] || "/bluelogo.png"}
                  alt=""
                  width={15}
                  height={15}
                  className="dark:filter-invert mr-4"
                />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-70" />

        <p className="ml-3 mt-4">Genres</p>
        <ul role="list" className="mt-2">
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            data.genres.map(({ name, id }: Genre) => (
              <li key={id} className="mb-1" role="listitem">
                <Link
                  href={`/`}
                  onClick={() => dispatch(selectGenreOrCategory(id))}
                  className="inline-flex w-full items-center p-3 text-left text-gray-600 hover:bg-gray-700 hover:text-gray-400"
                >
                  <Image
                    src={genreIcons[name.toLowerCase()] || "/bluelogo.png"}
                    alt=""
                    width={25}
                    height={25}
                    className="dark:filter-invert mr-4"
                  />
                  {name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
