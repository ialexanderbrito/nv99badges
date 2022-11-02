import { Link, useNavigate } from 'react-router-dom';

import logo from 'assets/logo.svg';

export function Header() {
  const navigate = useNavigate();
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate('/', { replace: true });
    window.location.reload();
  }

  return (
    <header className="bg-primary/90 w-full h-12 flex items-center justify-center fixed top-0 backdrop-blur-2xl ">
      <Link to="/" className="flex items-center justify-center">
        <img
          src={logo}
          alt="Logo NV99"
          className="w-7 h-7"
          onClick={() => {
            scrollToTop();
          }}
        />
      </Link>
    </header>
  );
}
