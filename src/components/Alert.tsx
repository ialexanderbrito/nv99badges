import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { getCookie, setCookie } from 'typescript-cookie';

interface AlertProps {
  title: string;
}

export function Alert(props: AlertProps) {
  const [show, setShow] = useState(true);
  const SEVEN_DAYS = 7;

  function closeAlert() {
    setCookie('alert', 'true', { expires: SEVEN_DAYS });
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
        <div className="flex bg-nv rounded-sm text-white text-center p-2 w-80 mt-20 mb-4 sm:w-80 md:w-[900px]">
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
