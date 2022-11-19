import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export function Layout({ children, disabled }: LayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-dark w-full items-center flex flex-col">
      <Header />

      {!disabled ? (
        <div className="flex px-6 w-full items-center text-white mt-16 cursor-pointer md:px-10">
          <BiArrowBack size={32} onClick={() => navigate(-1)} />
        </div>
      ) : null}

      <div className="w-full flex-1 flex flex-col">{children}</div>
    </div>
  );
}
