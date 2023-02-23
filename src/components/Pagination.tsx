import { useEffect, useState } from 'react';

import cx from 'classnames';

interface PaginationProps {
  pages: number;
  currentPage: number;
  handlePage: (page: number) => void;
}

export function Pagination({
  pages,
  currentPage,
  handlePage,
}: PaginationProps) {
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [startPage, setStartPage] = useState(currentPage);
  const [buttonsToShow, setButtonsToShow] = useState(10);

  useEffect(() => {
    const array = [];

    for (let i = 1; i <= pages; i++) {
      array.push(i);
    }

    setPagesArray(array);
  }, [pages]);

  function prevButton() {
    if (startPage > buttonsToShow) {
      setStartPage(startPage - buttonsToShow);
      setButtonsToShow(10);
    } else {
      setStartPage(1);
    }
  }

  function nextButton() {
    if (startPage + buttonsToShow <= pages) {
      setStartPage(startPage + buttonsToShow);
    } else {
      setStartPage(pages);
    }
  }

  return (
    <div className="flex justify-center items-center mt-8">
      <button
        className={cx(
          ' text-white font-bold flex justify-center items-center mr-1',
          {
            'opacity-50 cursor-not-allowed': startPage === 1,
          },
        )}
        onClick={prevButton}
        disabled={startPage === 1}
      >
        {'<'}
      </button>
      {pagesArray
        .slice(startPage - 1, startPage + buttonsToShow - 1)
        .map((page) => (
          <button
            key={page}
            className={cx(
              'text-white flex justify-center items-center mx-1 gap-3 m-5',
              {
                'text-nv bg-primary/90 w-7 h-7 rounded-md font-bold':
                  page === currentPage,
              },
            )}
            onClick={() => handlePage(page)}
          >
            {page}
          </button>
        ))}

      <button
        className={cx(
          'text-white font-bold flex justify-center items-center ml-1',
          {
            'opacity-50 cursor-not-allowed': startPage + buttonsToShow > pages,
          },
        )}
        onClick={nextButton}
        disabled={startPage + buttonsToShow > pages}
      >
        {'>'}
      </button>
    </div>
  );
}
