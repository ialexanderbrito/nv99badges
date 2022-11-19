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
          className="bg-nv hover:bg-primary text-white font-bold rounded-md fixed bottom-4 right-4 w-10 h-10 flex items-center justify-center z-50"
          onClick={() => {
            handleScrollToTop();
          }}
        >
          <BiArrowToTop size={24} />
        </button>
      )}
    </>
  );
}
