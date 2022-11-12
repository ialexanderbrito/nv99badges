import { Helmet } from 'react-helmet';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

import { Spark } from 'assets/Spark';
import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { Header } from 'components/Header';

import { twoDecimals } from 'utils/twoDecimal';

export function Favoritos() {
  const navigate = useNavigate();
  const favorites: Badge[] = JSON.parse(
    localStorage.getItem('@nv99badges:favorites') || '[]',
  );

  return (
    <>
      <Helmet>
        <title>NV99 Badge | Favoritos</title>
      </Helmet>

      <div className="bg-dark w-full items-center flex flex-col">
        <Header />

        <div className="flex px-6 w-full items-center text-white mt-16 cursor-pointer md:px-10">
          <BiArrowBack size={32} onClick={() => navigate(-1)} />
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center h-[850px] justify-center">
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              Você não tem nenhum emblema favoritado
            </h1>
          </div>
        ) : (
          <>
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              Seus emblemas favoritos
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {favorites &&
                favorites.map((favorite) => (
                  <Link
                    to={`/badge/${favorite.code}`}
                    key={favorite.id}
                    className={cx(
                      'flex relative gap-2 h-25 md:h-30 w-full bg-primary rounded-none md:rounded cursor-pointer',
                      {
                        'border border-nv': favorite?.secret,
                      },
                    )}
                  >
                    <div className="flex absolute top-1 left-1 z-10 flex-col gap-1"></div>
                    <img
                      src={favorite.high}
                      alt="Avatar"
                      className="w-32 h-32 rounded"
                    />

                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="flex flex-col flex-1 flex-shrink gap-2 p-3 text-white">
                        <span className="text-md font-semibold text-ui-white line-clamp-1 skeletable">
                          {favorite?.name}
                        </span>
                        <span className="text-sm line-clamp-3">
                          {favorite?.description}
                        </span>
                        <p className="flex gap-2 items-center">
                          Valor mais baixo :
                          <Spark />
                          <span className="font-bold text-nv">
                            {twoDecimals(favorite?.market_value || 0)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
