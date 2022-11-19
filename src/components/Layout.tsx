import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { ButtonTopPage } from './ButtonTop';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export function Layout({ children, disabled }: LayoutProps) {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="flex mt-14 w-full items-center flex-col min-h-[calc(100vh-3.5rem)]">
        {!disabled ? (
          <div className="flex px-6 w-full items-center text-white mt-4 cursor-pointer md:px-10">
            <BiArrowBack size={32} onClick={() => navigate(-1)} />
          </div>
        ) : null}

        {children}
      </div>
      <Footer />
      <ButtonTopPage />
    </>
  );
}
