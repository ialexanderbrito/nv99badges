import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Badge } from 'types/BadgesProps';

import { Alert } from 'components/Alert';
import { ButtonTopPage } from 'components/ButtonTop';
import { Card } from 'components/Card';
import { CardSkeleton } from 'components/CardSkeleton';
import { Filter } from 'components/FIlter';
import { Header } from 'components/Header';
import { Menu } from 'components/Menu';
import { TopCard } from 'components/TopCard';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import {
  getBadges,
  getBadgesCreator,
  getBadgesSearch,
} from 'services/get/badges';

export function Homepage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    badges,
    badgesFiltered,
    badgesPodcast,
    isLoading,
    page,
    podcast,
    searchBadge,
    setBadges,
    setBadgesFiltered,
    setBadgesPodcast,
    setIsLoading,
    setPage,
    loadMoreBadges,
  } = useBadges();

  useEffect(() => {
    async function loadBadges() {
      setIsLoading(true);
      try {
        const { data } = await getBadges(12, page, 'asc');

        setBadges((old: Badge[]) => [...old, ...data.results]);

        setIsLoading(false);
      } catch (error) {
        toast.error('Não foram encontrados mais badges', { id: 'toast' });
      } finally {
        setIsLoading(false);
      }
    }

    if (podcast === '') {
      loadBadges();
    }
  }, [page]);

  useEffect(() => {
    setBadgesPodcast([]);
    setPage(1);
  }, [podcast]);

  useEffect(() => {
    async function loadBadgesCreator() {
      if (podcast) {
        setIsLoading(true);

        try {
          const { data } = await getBadgesCreator(podcast, 12, page, 'asc');

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
  }, [page, podcast]);

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

  const verificaBusca = isLoadingSearch && searchBadge !== '';
  const verificaBadgesBuscadas =
    badgesFiltered?.length > 0 && searchBadge.length > 0;
  const mostraBadgesMaisRaros = badges && searchBadge === '' && podcast === '';
  const mostraBadgesFiltrados =
    podcast !== '' && badgesPodcast && searchBadge === '';

  return (
    <>
      <Helmet>
        <title>NV99 Badges | Mais Raros</title>
      </Helmet>

      <div className="bg-dark w-full items-center flex flex-col">
        <Header />
        <Menu />
        <Alert
          title="Os emblemas podem demorar para carregar por conta do servidor, pois
            ele fica em modo hibernação para economizar recursos."
        />
        <Filter />

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

        {mostraBadgesMaisRaros && (
          <>
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              🏆 Top 3 🏆
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {badges
                .sort((a, b) => a.count - b.count)
                .slice(0, 3)
                .map((badge, index) => (
                  <TopCard
                    key={index}
                    badge={badge}
                    index={index}
                    onClick={() => {
                      navigate(`/badge/${badge.code}`);
                    }}
                  />
                ))}
            </div>

            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              Todos os emblemas
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {badges
                .sort((a, b) => a.count - b.count)
                .slice(3)
                .map((badge) => (
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

        {mostraBadgesFiltrados && (
          <>
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              Emblemas mais raros do{' '}
              {podcastNames.find((pdc) => pdc.id === podcast)?.name}
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {badgesPodcast
                .sort((a, b) => a.count - b.count)
                .map((badge) => (
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

        {badgesFiltered?.length === 0 && searchBadge !== '' && (
          <h1 className="text-white text-2xl font-bold mt-4 mb-4">
            Nenhum resultado encontrado para "{searchBadge}"
          </h1>
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

        {searchBadge === '' && (
          <button
            className="bg-primary text-white w-96 h-16 flex items-center justify-center rounded-md mb-6 mt-6 md:w-96 hover:bg-nv"
            onClick={() => {
              loadMoreBadges();
            }}
          >
            Carregar mais
          </button>
        )}

        <ButtonTopPage />
      </div>
    </>
  );
}
