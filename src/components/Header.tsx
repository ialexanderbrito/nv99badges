import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

import { logo } from 'assets';
import cx from 'classnames';

import { useBadges } from 'contexts/Badges';

import { AutoSuggest } from './AutoSuggest';

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useBadges();
  const [open, setOpen] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate('/');
    window.location.reload();
  }

  const Links = [
    { name: 'Mais Raros', link: '/' },
    { name: 'Mais Resgatados', link: '/mais-resgatados' },
    { name: 'Mais Recentes', link: '/mais-recentes' },
    { name: 'Canais', link: '/canais' },
    { name: 'Ranking', link: '/ranking' },
    { name: 'Favoritos', link: '/favoritos' },
  ];

  return (
    <div className="shadow-md w-full h-12 fixed top-0 left-0 z-50">
      <div className="backdrop-blur-2xl md:flex items-center justify-between bg-primary/90 py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Logo NV99"
              className="w-7 h-7"
              onClick={() => {
                scrollToTop();
              }}
            />
          </Link>
        </div>

        <div className="absolute left-16 top-3 cursor-pointer md:left-24">
          <AutoSuggest />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer lg:hidden"
        >
          {open ? (
            <IoClose className="text-nv" size={32} />
          ) : (
            <BiMenu className="text-nv" size={32} />
          )}
        </div>

        <ul
          className={`backdrop-blur-2xl bg-primary/90 lg:bg-transparent lg:backdrop-blur-0 lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? 'top-14 ' : 'top-[-490px]'
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="lg:ml-8 lg:my-0 my-7 ">
              <a
                href={link.link}
                className={cx('text-white hover:text-nv duration-500', {
                  'text-nv font-bold': pathname === link.link,
                })}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
