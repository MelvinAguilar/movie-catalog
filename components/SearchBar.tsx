"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovie } from "@/features/currentGenreOrCategory";

// eslint-disable-next-line max-lines
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mb-4 ml-auto max-w-sm"
    >
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <div className="relative flex items-center">
        <input
          type="search"
          id="default-search"
          className="border-default bg-control padding-control | block w-full rounded-3xl 
          border pr-12 text-sm text-gray-900 focus:border-blue-500
          focus:ring-blue-500 dark:text-white dark:placeholder-gray-400
          dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
        <button
          type="submit"
          className="absolute right-0 top-0 rounded-3xl border border-blue-700
           bg-blue-700 p-2 text-sm font-medium text-white hover:bg-blue-800
            focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600
            dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => dispatch(searchMovie(query))}
        >
          <svg
            className="h-4 w-4"
            aria-hidden="true"
            aria-selected="false"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
