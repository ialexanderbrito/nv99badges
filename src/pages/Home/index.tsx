import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Badge } from 'types/BadgesProps';

import { Alert } from 'components/Alert';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { CardSkeleton } from 'components/CardSkeleton';
import { Filter } from 'components/FIlter';
import { TopCard } from 'components/TopCard';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getBadges, getBadgesCreator } from 'services/get/badges';

export function Homepage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    badges,
    badgesPodcast,
    page,
    podcast,
    setBadges,
    setBadgesPodcast,
    setPage,
    loadMoreBadges,
    setTotalBadges,
    totalBadges,
  } = useBadges();

  const { isLoading } = useQuery(
    ['badges', page],
    () => getBadges(12, page, 'asc'),
    {
      onSuccess: (data) => {
        setTotalBadges(data.data.total);

        setBadges((old: Badge[]) => [...old, ...data.data.results]);
      },
      onError: () => {
        toast.error('Não foram encontrados mais badges', { id: 'toast' });
      },
      staleTime: 100000,
    },
  );

  useEffect(() => {
    setBadgesPodcast([]);
    setPage(1);
  }, [podcast]);

  useQuery(
    ['badgesCreator', podcast, page],
    () => getBadgesCreator(podcast, 12, page, 'asc'),
    {
      onSuccess: (data) => {
        setBadgesPodcast((old: Badge[]) => [...old, ...data.data.results]);
      },
      onError: () => {
        toast.error('Não foram encontrados mais badges 2', { id: 'toast' });
      },
      staleTime: 100000,
      enabled: podcast !== '',
    },
  );

  const mostraBadgesMaisRaros = badges && podcast === '';
  const mostraBadgesFiltrados = podcast !== '' && badgesPodcast;

  return (
    <>
      <Helmet>
        <title>NV99 Badges | Mais Raros</title>
      </Helmet>

      <Alert
        title="Os emblemas podem demorar para carregar por conta do servidor, pois
            ele fica em modo hibernação para economizar recursos."
      />
      <Filter />

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
            Todos os {totalBadges || '...'} emblemas
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

      {isLoading && (
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

      <Button
        onClick={() => {
          loadMoreBadges();
        }}
      >
        Carregar mais
      </Button>
    </>
  );
}
