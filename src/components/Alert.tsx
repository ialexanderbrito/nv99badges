import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { getCookie, setCookie } from 'typescript-cookie';

interface AlertProps {
  title: string;
}

export function Alert(props: AlertProps) {
  const [show, setShow] = useState(true);
  const ONE_DAY = 1;

  function closeAlert() {
    setCookie('alert', 'true', { expires: ONE_DAY });
    setShow(false);
  }

  useEffect(() => {
    const alert = getCookie('alert');

    if (alert === 'true') {
      setShow(false);
    }
  }, []);

  return (
    <>
      {show && (
        <div className="flex bg-nv rounded-sm text-white text-center p-2 w-80 mt-6 mb-[-4rem] sm:w-80 md:w-[900px]">
          <p className="text-sm font-bold">{props.title}</p>
          <AiOutlineClose
            className="text-white text-sm cursor-pointer w-8 sm:w-4"
            onClick={() => {
              closeAlert();
            }}
          />
        </div>
      )}
    </>
  );
}
