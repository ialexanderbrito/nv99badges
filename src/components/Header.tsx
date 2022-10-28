import { SiGithub } from 'react-icons/si';
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
      <Link
        to="/"
        onClick={() => {
          scrollToTop();
        }}
        className="w-full flex items-center justify-center"
      >
        <img src={logo} alt="Logo NV99" className="w-9 h-9" />
      </Link>

      <div className="mr-12">
        <a
          href="https://www.github.com/ialexanderbrito/nv99badges"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub size={30} color="#FFF" />
        </a>
      </div>
    </header>
  );
}
