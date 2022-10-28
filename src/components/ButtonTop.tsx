import { useEffect, useState } from 'react';
import { BiArrowToTop } from 'react-icons/bi';

export function ButtonTopPage() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 400 && !isActive) {
        setIsActive(true);
      }

      if (window.scrollY <= 400 && isActive) {
        setIsActive(false);
      }
    });
  }, [isActive]);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      {isActive && (
        <button
          type="button"
          className="bg-nv hover:bg-primary text-white font-bold py-2 px-4 rounded-md fixed bottom-4 right-4 w-14 h-14 flex items-center justify-center"
          onClick={() => {
            handleScrollToTop();
          }}
        >
          <BiArrowToTop size={32} />
        </button>
      )}
    </>
  );
}
