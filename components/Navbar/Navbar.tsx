"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaUserAlt } from "react-icons/fa";
import { fetchToken, createSessionId, moviesApi } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "@/features/auth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const Navbar = () => {
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const [token, setToken] = useLocalStorage("request_token", "");

  const [sessionIdFromLocalStorage, setSessionIdFromLocalStorage] =
    useLocalStorage("session_id", "");

  const { isAuthenticated, user } = useSelector(selectUser);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  return (
    <header
      className={` | fixed top-0 z-50 flex w-full items-center justify-between border-b border-transparent p-4 transition duration-500 ${
        scrollPosition > 0
          ? "border-gray-200 bg-gray-100/80 shadow-md dark:border-gray-600 dark:bg-gray-900/80  "
          : ""
      }`}
    >
      <Link
        href="/"
        className="bg-very-dark-blue absolute left-0 z-50 m-3 -translate-x-[150%] border-2 border-white p-3 transition focus:translate-x-0"
      >
        Skip to main content
      </Link>

      <Link href="/">
        <Image
          src="/bluelogo.png"
          alt="filmpire"
          width={100}
          height={50}
          className="cursor-pointer"
        />
      </Link>

      <ul
        role="list"
        className={`flex flex-col items-end justify-between gap-4 md:flex-row md:items-center`}
      >
        <li role="listitem">
          {isAuthenticated ? (
            <Link
              type="button"
              className="padding-control | inline-flex items-center rounded-3xl border border-slate-300 bg-transparent text-sm font-medium text-slate-300"
              href={`/profile/${user.id}`}
            >
              My Movies
              {user?.avatar?.tmdb?.avatar?.avatar_path && (
                <Image
                  src={
                    user?.avatar?.tmdb?.avatar?.avatar_path
                      ? `https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`
                      : "/no-image.png"
                  }
                  alt="Profile"
                  width={30}
                  height={30}
                  className="ml-2 rounded-full"
                />
              )}
            </Link>
          ) : (
            <button
              type="button"
              className="padding-control | inline-flex items-center rounded-3xl border border-slate-300 bg-transparent text-sm font-medium text-slate-300"
              onClick={fetchToken}
            >
              Login
              <FaUserAlt aria-hidden="true" className="ml-2" />
            </button>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
