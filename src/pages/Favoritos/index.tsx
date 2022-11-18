import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  BiArrowBack,
  BiCaretUp,
  BiCaretDown,
  BiTrashAlt,
} from 'react-icons/bi';
import { CgBorderStyleSolid } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Pulsar } from '@uiball/loaders';
import { Spark } from 'assets/Spark';
import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { Card } from 'components/Card';
import { CardSkeleton } from 'components/CardSkeleton';
import { Header } from 'components/Header';

import { twoDecimals } from 'utils/twoDecimal';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { useFavorites } from 'hooks/Favorites';

import { getBadgeById, getBadgesSearch } from 'services/get/badges';

export function Favoritos() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { badgesFiltered, searchBadge, setBadgesFiltered } = useBadges();
  const { removeFavorite } = useFavorites();
  const [favorites, setFavorites] = useState<Badge[]>([]);
  const [oldFavorites, setOldFavorites] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOldFavorites(
      JSON.parse(localStorage.getItem('@nv99badges:favorites') || '[]'),
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    const favorites = JSON.parse(
      localStorage.getItem('@nv99badges:favorites') || '[]',
    );

    const favoritesCode = favorites.map((favorite: Badge) => favorite.code);

    const promises = favoritesCode.map((code: string) => getBadgeById(code));

    Promise.all(promises).then((badges) => {
      const newFavorites = badges.map((badge, index) => ({
        ...favorites[index],
      }));

      setFavorites(newFavorites);

      localStorage.setItem(
        '@nv99badges:favorites',
        JSON.stringify(newFavorites),
      );

      const newBadgesValues = badges.map((badge, index) => {
        const market_value = badge.data.market_value;

        const market_value_old = favorites[index].market_value;

        const market_value_change = market_value - market_value_old;

        const market_value_change_percentage =
          (market_value_change / market_value_old) * 100;

        let market_value_change_type: 'same' | 'up' | 'down';

        if (market_value_change_percentage > 0) {
          market_value_change_type = 'up';
        } else if (market_value_change_percentage < 0) {
          market_value_change_type = 'down';
        } else {
          market_value_change_type = 'same';
        }

        return {
          ...badge.data,
          market_value_change,
          market_value_change_percentage,
          market_value_change_type,
        };
      });

      setFavorites(newBadgesValues);
      setLoading(false);
    });
  }, []);

  function verifyBadgeMarketValueChange(badge: Badge) {
    if (badge.market_value_change_type === 'same') {
      return <CgBorderStyleSolid className="text-gray-500" />;
    } else if (badge.market_value_change_type === 'up') {
      return <BiCaretUp className=" text-red-600" />;
    } else {
      return <BiCaretDown className="text-green-500" />;
    }
  }

  function handleRemoveFavorite(badge: Badge) {
    removeFavorite(badge);
    setFavorites(
      JSON.parse(localStorage.getItem('@nv99badges:favorites') || '[]'),
    );
  }

  const { isLoading: isLoadingSearch } = useQuery(
    ['search', searchBadge],
    () => getBadgesSearch(searchBadge),
    {
      onSuccess: (data) => {
        setBadgesFiltered(data.data);
      },
      onError: () => {
        toast.error('Badges not found');
      },
      staleTime: 100000,
      enabled: searchBadge !== '',
    },
  );

  const verificaBusca = isLoadingSearch && searchBadge !== '';
  const verificaBadgesBuscadas =
    badgesFiltered?.length > 0 && searchBadge.length > 0;

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

        {verificaBusca ? (
          <>
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              Resultados para "{searchBadge}"
            </h1>
            {Array.from({ length: 2 }).map((_, index) => (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <CardSkeleton key={index} />
                  <CardSkeleton key={index} />
                  <CardSkeleton key={index} />
                </div>
              </>
            ))}
          </>
        ) : (
          <>
            {verificaBadgesBuscadas && (
              <>
                <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                  Resultados para "{searchBadge}"
                </h1>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {badgesFiltered.map((badge) => (
                    <Card
                      badge={badge}
                      key={badge.id}
                      onClick={() => {
                        navigate(`/badge/${badge.code}`);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {loading ? (
          <>
            <div className="flex justify-center items-center h-screen">
              <Pulsar size={32} color="#f8c227" />
            </div>
          </>
        ) : (
          <>
            {!verificaBusca && !verificaBadgesBuscadas && (
              <>
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
                          <div
                            key={favorite.id}
                            className={cx(
                              'flex relative gap-2 h-25 md:h-30 w-full bg-primary rounded-none md:rounded ',
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

                            <div
                              className="absolute bg-primary/90 top-0 right-1 p-1 rounded cursor-pointer"
                              onClick={() => handleRemoveFavorite(favorite)}
                            >
                              <p className="font-bold text-md italic text-nv">
                                <BiTrashAlt />
                              </p>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-1">
                              <div className="flex flex-col flex-1 flex-shrink gap-2 p-3 text-white">
                                <span className="text-md font-semibold text-ui-white line-clamp-1 skeletable">
                                  {favorite?.name}
                                </span>
                                <span className="text-sm line-clamp-3">
                                  {favorite?.description}
                                </span>
                                <p className="flex gap-2 items-center">
                                  Comprar:
                                  <Link
                                    to={`/badge/${favorite.code}`}
                                    className="flex gap-2 items-center"
                                  >
                                    <Spark />
                                    <span className="font-bold text-nv">
                                      {twoDecimals(favorite?.market_value || 0)}
                                    </span>
                                    {verifyBadgeMarketValueChange(favorite)}
                                  </Link>
                                </p>
                                <p className="flex gap-2 items-center">
                                  Preço salvo:
                                  {oldFavorites?.map((oldFavorite) => (
                                    <>
                                      {oldFavorite.id === favorite.id && (
                                        <span className="font-bold text-nv">
                                          {twoDecimals(
                                            oldFavorite?.market_value || 0,
                                          )}
                                        </span>
                                      )}
                                    </>
                                  ))}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
