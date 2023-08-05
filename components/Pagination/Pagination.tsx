import Link from "next/link";
import React from "react";

interface PaginationProps {
  isRouter?: boolean;
  genreId: string;
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  isRouter = true,
  genreId,
  page,
  totalPages,
  setPage,
}) => {
  const LIMIT_PAGES = totalPages > 500 ? 500 : totalPages;

  const handlePrev = () => {
    if (page !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (page !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  if (totalPages === 0) return null;

  return (
    <>
      <nav role="navigation" aria-label="Pagination Navigation">
        <ul role="list" className="my-4 flex items-center justify-center">
          <li role="listitem">
            <Link
              aria-disabled={page === 1}
              href={
                isRouter ? `/genre?genreId=${genreId}&page=${page - 1}` : "/"
              }
              onClick={handlePrev}
              className={`flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                page === 1 ? "cursor-not-allowed" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </Link>
          </li>
          {page > 3 && (
            <>
              <li role="listitem">
                <Link
                  href={isRouter ? `/genre?genreId=${genreId}&page=1` : "/"}
                  onClick={() => handlePage(1)}
                  className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  1
                </Link>
              </li>
              <li role="listitem" aria-hidden="true">
                <button
                  type="button"
                  disabled
                  className="-ml-px flex h-8 w-8 cursor-not-allowed items-center justify-center border border-gray-300 bg-white text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                >
                  ...
                </button>
              </li>
            </>
          )}

          {page > 2 && (
            <li role="listitem">
              <Link
                href={
                  isRouter ? `/genre?genreId=${genreId}&page=${page - 2}` : "/"
                }
                onClick={() => handlePage(page - 2)}
                className="-ml-px flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {page - 2}
              </Link>
            </li>
          )}
          {page > 1 && (
            <li role="listitem">
              <Link
                href={
                  isRouter ? `/genre?genreId=${genreId}&page=${page - 1}` : "/"
                }
                onClick={() => handlePage(page - 1)}
                className="-ml-px flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {page - 1}
              </Link>
            </li>
          )}
          <li role="listitem">
            <Link
              href={isRouter ? `/genre?genreId=${genreId}&page=${page}` : "/"}
              onClick={() => handlePage(page)}
              className="-ml-px flex h-8 w-8 items-center justify-center border border-blue-600 bg-blue-600 text-sm text-white hover:bg-blue-700 hover:text-white dark:border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:hover:text-white"
            >
              {page}
            </Link>
          </li>
          {page < totalPages && page < LIMIT_PAGES && (
            <li role="listitem">
              <Link
                href={
                  isRouter ? `/genre?genreId=${genreId}&page=${page + 1}` : "/"
                }
                onClick={() => handlePage(page + 1)}
                className="-ml-px flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {page + 1}
              </Link>
            </li>
          )}
          {page < totalPages - 1 && page < LIMIT_PAGES - 1 && (
            <li role="listitem">
              <Link
                href={
                  isRouter ? `/genre?genreId=${genreId}&page=${page + 2}` : "/"
                }
                onClick={() => handlePage(page + 2)}
                className="-ml-px flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {page + 2}
              </Link>
            </li>
          )}
          {page < totalPages - 2 && page < LIMIT_PAGES - 2 && (
            <>
              <li role="listitem" aria-hidden="true">
                <button
                  type="button"
                  disabled
                  className="-ml-px flex h-8 w-8 cursor-not-allowed items-center justify-center border border-gray-300 bg-white text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                >
                  ...
                </button>
              </li>
              <li role="listitem">
                <Link
                  href={
                    isRouter
                      ? `/genre?genreId=${genreId}&page=${LIMIT_PAGES}`
                      : "/"
                  }
                  onClick={() => handlePage(LIMIT_PAGES)}
                  className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {LIMIT_PAGES}
                </Link>
              </li>
            </>
          )}

          <li role="listitem">
            <Link
              aria-disabled={page === LIMIT_PAGES}
              href={
                isRouter ? `/genre?genreId=${genreId}&page=${page + 1}` : "/"
              }
              onClick={() => handlePage(page + 1)}
              className={`flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                page === LIMIT_PAGES ? "cursor-not-allowed" : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
