import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BiFilterAlt, BiSortAZ, BiSortZA } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { ButtonTopPage } from 'components/ButtonTop';
import { Card } from 'components/Card';
import { CardSkeleton } from 'components/CardSkeleton';
import { Header } from 'components/Header';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import {
  getBadges,
  getBadgesCreator,
  getBadgesSearch,
} from 'services/get/badges';

export function MaisResgatados() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    badges,
    badgesFiltered,
    badgesPodcast,
    filter,
    isLoading,
    order,
    page,
    podcast,
    searchBadge,
    setBadges,
    setBadgesFiltered,
    setBadgesPodcast,
    setFilter,
    setIsLoading,
    setPage,
    setPodcast,
    setSearchBadge,
    pathname,
    handleSelectedMaisRaros,
    handleSelectedMaisResgatados,
    handleSelectedMaisRecentes,
    handleSelectedOrder,
    loadMoreBadges,
  } = useBadges();

  useEffect(() => {
    async function loadBadgesMaisResgates() {
      setIsLoading(true);

      if (searchBadge === '') {
        try {
          const { data } = await getBadges(12, page, 'desc');

          setBadges((old: Badge[]) => [...old, ...data.results]);

          setIsLoading(false);
        } catch (error) {
          toast.error('Não foram encontrados mais badges', { id: 'toast' });
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (podcast === '') {
      loadBadgesMaisResgates();
    }
  }, [page]);

  useEffect(() => {
    setBadgesPodcast([]);
    setPage(1);
  }, [order, podcast]);

  useEffect(() => {
    async function loadBadgesCreator() {
      if (podcast) {
        setIsLoading(true);

        try {
          const { data } = await getBadgesCreator(podcast, 12, page, order);

          setBadgesPodcast((old: Badge[]) => [...old, ...data.results]);

          setIsLoading(false);
        } catch (error) {
          toast.error('Não foram encontrados mais badges', { id: 'toast' });
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadBadgesCreator();
  }, [page, podcast, order]);

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
    },
  );

  return (
    <>
      <Helmet>
        <title>NV99 Badges | Mais Resgatados</title>
      </Helmet>

      <div className="bg-dark w-full items-center flex flex-col">
        <Header />

        <div className="w-full justify-around mt-16 items-center flex flex-col  h-72 md:flex-row md:w-[900px] md:mt-0 md:h-48">
          <button
            type="button"
            className={cx(
              'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
              {
                'text-nv border border-nv': pathname === '/mais-raros',
              },
            )}
            onClick={() => handleSelectedMaisRaros()}
          >
            Mais Raros
          </button>
          <button
            type="button"
            className={cx(
              'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
              {
                'text-nv  border border-nv': pathname === '/mais-resgatados',
              },
            )}
            onClick={() => handleSelectedMaisResgatados()}
          >
            Mais Resgatados
          </button>
          <button
            type="button"
            className={cx(
              'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
              {
                'text-nv  border border-nv': pathname === '/mais-recentes',
              },
            )}
            onClick={() => handleSelectedMaisRecentes()}
          >
            Mais Recentes
          </button>

          <input
            type="text"
            placeholder="Pesquisar"
            value={searchBadge}
            onChange={(e) => {
              setSearchBadge(e.target.value);
            }}
            className="bg-primary text-white h-16 w-80 rounded-md px-4 outline-none  focus:border hover:border border-nv sm:w-80"
          />
        </div>

        <div className="flex gap-2 w-80 sm:w-3/4 md:w-[900px] ">
          <button
            className="bg-primary gap-4 text-white w-60 h-16 flex items-center justify-center rounded-md mb-6 mt-6 md:w-96 hover:bg-nv "
            onClick={() => {
              setFilter(!filter);
            }}
          >
            <BiFilterAlt />
            Filtrar por podcast
          </button>
          <button
            className="bg-primary gap-4 text-white w-20 h-16 flex items-center justify-center rounded-md mb-6 mt-6 md:w-20 hover:bg-nv disabled:cursor-not-allowed disabled:hover:bg-primary"
            onClick={() => {
              handleSelectedOrder();
            }}
            disabled={filter === false || podcast === ''}
          >
            {order === 'desc' ? (
              <BiSortAZ className="text-2xl" />
            ) : (
              <BiSortZA className="text-2xl" />
            )}
          </button>
        </div>

        {filter && (
          <div className="text-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {podcastNames.map((pdc) => (
              <label className="flex font-bold p-3">
                <input
                  type="radio"
                  name="podcast"
                  value={podcast}
                  className="accent-nv mr-2"
                  onClick={() => {
                    setPodcast(pdc.id);
                  }}
                />
                {pdc.name}
              </label>
            ))}
          </div>
        )}

        {isLoadingSearch && (
          <>
            {searchBadge !== '' && (
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
            )}
          </>
        )}

        {badges && searchBadge === '' && podcast === '' && (
          <>
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              Emblemas mais resgatados
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {badges
                .sort((a, b) => b.count - a.count)
                .map((badge) => (
                  <Card
                    badge={badge}
                    key={badge.badge_id}
                    onClick={() => {
                      navigate(`/badge/${badge.code}`);
                    }}
                  />
                ))}
            </div>
          </>
        )}

        {podcast !== '' && badgesPodcast && searchBadge === '' && (
          <>
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              {order === 'desc'
                ? 'Emblemas mais antigos'
                : 'Emblemas mais recentes'}
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {badgesPodcast
                .sort((a, b) => {
                  const dateA: any = new Date(a.created_at);
                  const dateB: any = new Date(b.created_at);

                  if (order === 'desc') {
                    return dateA - dateB;
                  } else {
                    return dateB - dateA;
                  }
                })
                .map((badge) => (
                  <Card
                    badge={badge}
                    key={badge.badge_id}
                    onClick={() => {
                      navigate(`/badge/${badge.code}`);
                    }}
                  />
                ))}
            </div>
          </>
        )}

        {badgesFiltered?.length === 0 && searchBadge !== '' && (
          <h1 className="text-white text-2xl font-bold mt-4 mb-4">
            Nenhum resultado encontrado para "{searchBadge}"
          </h1>
        )}

        {badgesFiltered?.length > 0 && searchBadge !== '' && (
          <>
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              Resultados para "{searchBadge}"
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {badgesFiltered.map((badge) => (
                <Card
                  badge={badge}
                  key={badge.badge_id}
                  onClick={() => {
                    navigate(`/badge/${badge.code}`);
                  }}
                />
              ))}
            </div>
          </>
        )}

        {isLoading && searchBadge === '' && (
          <>
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
        )}

        <button
          className="bg-primary text-white w-96 h-16 flex items-center justify-center rounded-md mb-6 mt-6 md:w-96 hover:bg-nv"
          onClick={() => {
            loadMoreBadges();
          }}
        >
          Carregar mais
        </button>

        <ButtonTopPage />
      </div>
    </>
  );
}
