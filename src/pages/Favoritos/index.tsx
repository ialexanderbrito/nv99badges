import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BiCaretUp, BiCaretDown, BiTrashAlt } from 'react-icons/bi';
import { CgBorderStyleSolid } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import { Pulsar } from '@uiball/loaders';
import { Spark } from 'assets';
import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { twoDecimals } from 'utils/twoDecimal';

import { useToast } from 'contexts/Toast';

import { getBadgesFavorites } from 'services/get/badges';

export function Favoritos() {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getFavorites() {
      setLoading(true);

      try {
        const favorites = JSON.parse(
          localStorage.getItem('@nv99badges:favorites') || '[]',
        );

        const favoritesCode = favorites.map((favorite: Badge) => favorite.code);

        const { data } = await getBadgesFavorites(favoritesCode);

        setFavorites(data);

        localStorage.setItem('@nv99badges:favorites', JSON.stringify(data));

        const newBadgesValues = data.map((badge: Badge, index: number) => {
          const market_value = badge.market_value;

          const market_value_old = favorites[index].market_value;

          const desired_price = favorites[index].desired_price || 0;

          const market_value_change = market_value - desired_price;

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
            ...badge,
            market_value_change,
            market_value_change_percentage,
            market_value_change_type,
            desired_price,
          };
        });

        setFavorites(newBadgesValues);

        localStorage.setItem(
          '@nv99badges:favorites',
          JSON.stringify(newBadgesValues),
        );

        toast.success('Badges favoritos atualizados', { id: 'toast' });

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar badges favoritos', { id: 'toast' });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    getFavorites();
  }, []);

  function verifyBadgeMarketValueChange(badge: Badge) {
    if (badge.market_value_change_type === 'same') {
      return <CgBorderStyleSolid className="text-white" />;
    } else if (badge.market_value_change_type === 'up') {
      return <BiCaretUp className=" text-red-600" />;
    } else {
      return <BiCaretDown className="text-green-500" />;
    }
  }

  async function handleRemoveFavoriteBadge(badge: Badge) {
    const newFavorites = favorites.filter(
      (favorite) => favorite.code !== badge.code,
    );

    setFavorites(newFavorites);

    toast.success('Emblema removido dos favoritos', { id: 'toast' });

    localStorage.setItem('@nv99badges:favorites', JSON.stringify(newFavorites));
  }

  async function handleUpdateFavoriteBadge(
    event: React.ChangeEvent<HTMLInputElement>,
    badge: Badge,
  ) {
    const newFavorites = favorites.map((favorite) => {
      if (favorite.code === badge.code) {
        return {
          ...favorite,
          desired_price: Number(event.target.value),
        };
      }

      return favorite;
    });

    setFavorites(newFavorites);

    localStorage.setItem('@nv99badges:favorites', JSON.stringify(newFavorites));

    toast.success('Emblema atualizado', { id: 'toast' });
  }

  return (
    <>
      <Helmet>
        <title>NV99 Badge | Favoritos</title>
      </Helmet>

      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <Pulsar size={32} color="#f8c227" />
          </div>
        </>
      ) : (
        <>
          <>
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center h-screen justify-center">
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
                          'flex relative gap-2 h-25 md:h-30 w-full bg-primary rounded-none md:rounded items-center',
                          {
                            'border border-nv': favorite?.secret,
                          },
                        )}
                      >
                        <div className="flex absolute top-1 left-1 z-10 flex-col gap-1"></div>
                        <img
                          src={favorite.high}
                          alt={favorite.name}
                          className="w-36 h-36 rounded"
                        />

                        <div
                          className="absolute bg-primary/90 top-0 right-1 p-1 rounded cursor-pointer"
                          onClick={() => handleRemoveFavoriteBadge(favorite)}
                        >
                          <p className="font-bold text-md italic text-nv hover:text-nv/60">
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
                                <span className="font-bold text-nv hover:text-nv/60">
                                  {twoDecimals(favorite?.market_value || 0)}
                                </span>
                                {verifyBadgeMarketValueChange(favorite)}
                              </Link>
                            </p>
                            <p className="flex gap-2 items-center">
                              Preço desejado:
                              <input
                                type="number"
                                className="bg-primary/90 text-white rounded p-1 w-24  sm:w-10 md:w-24"
                                value={favorite?.desired_price}
                                onChange={(e) =>
                                  handleUpdateFavoriteBadge(e, favorite)
                                }
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </>
        </>
      )}
    </>
  );
}
