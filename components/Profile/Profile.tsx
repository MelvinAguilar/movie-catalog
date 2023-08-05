"use client";

import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth";
import { useGetListQuery } from "@/services/TMDB";
import { RatedCards } from "..";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CarouselSkeleton from "../MovieList/CarouselSkeleton";

const Profile = () => {
  const { user } = useSelector(selectUser);

  const [sessionId] = useLocalStorage("session_id", "");

  const {
    data: favoriteMovies,
    isFetching: isFetchingFavoriteMovies,
    refetch: refetchFavorites,
  } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId,
    page: 1,
  });

  const {
    data: watchlistMovies,
    isFetching: isFetchingWatchlistMovies,
    refetch: refetchWatchlisted,
  } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId,
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container mt-20 p-6 md:p-8">
      <h1 className="text-2xl font-medium text-blue-500">
        My Profile - {user?.username}
      </h1>

      <button
        type="button"
        className="my-6 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={logout}
      >
        Logout
      </button>

      {isFetchingFavoriteMovies ? (
        <>
          <Skeleton className="my-4" />
          <CarouselSkeleton numberOfSkeletons={6} />
        </>
      ) : !favoriteMovies?.results.length ? (
        <p>You have no favorite movies</p>
      ) : (
        <RatedCards title="Favorite Movies" movies={favoriteMovies} />
      )}

      {isFetchingWatchlistMovies ? (
        <>
          <Skeleton className="my-4" />
          <CarouselSkeleton numberOfSkeletons={6} />;
        </>
      ) : !watchlistMovies?.results.length ? (
        <p>You have no watchlisted movies</p>
      ) : (
        <RatedCards title="Watchlisted Movies" movies={watchlistMovies} />
      )}
    </div>
  );
};

export default Profile;
