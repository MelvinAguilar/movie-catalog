import Link from "next/link";
import React from "react";
import GenericCarousel from "./GenericCarousel";
import { AiOutlineLink } from "react-icons/ai";

const CatalogCarousel = () => {
  return (
    <>
      <section className="catalog" id="movie-list">
        <div className="my-4 flex flex-wrap items-end gap-4 md:flex-row">
          <h2 className="text-2xl font-medium text-blue-500">Popular</h2>
          <Link
            href="/genre?genreId=popular&page=1"
            className="catalog-link flex items-center gap-2 md:invisible"
          >
            See more
            <AiOutlineLink />
          </Link>
        </div>
        <GenericCarousel genreIdOrCategoryName="popular" />
      </section>

      <section className="catalog">
        <div className="mb-4 mt-14 flex flex-wrap items-end gap-4 md:flex-row">
          <h2 className="text-2xl font-medium text-blue-500">Top Rated</h2>
          <Link
            href="/genre?genreId=top_rated&page=1"
            className="catalog-link flex items-center gap-2 md:invisible"
          >
            See more
            <AiOutlineLink aria-hidden="true" />
          </Link>
        </div>
        <GenericCarousel genreIdOrCategoryName="top_rated" />
      </section>

      <section className="catalog">
        <div className="mb-4 mt-14 flex flex-wrap items-end gap-4 md:flex-row">
          <h2 className="text-2xl font-medium text-blue-500">Upcoming</h2>
          <Link
            href="/genre/genreId?=upcoming&page=1"
            className="catalog-link flex items-center gap-2 md:invisible"
          >
            See more
            <AiOutlineLink aria-hidden="true" />
          </Link>
        </div>
        <GenericCarousel genreIdOrCategoryName="upcoming" />
      </section>
    </>
  );
};

export default CatalogCarousel;
