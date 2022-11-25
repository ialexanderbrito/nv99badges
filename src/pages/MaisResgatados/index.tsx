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

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getBadges, getBadgesCreator } from 'services/get/badges';

export function MaisResgatados() {
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
  } = useBadges();

  const { isLoading } = useQuery(
    ['badges', page],
    () => getBadges(12, page, 'desc'),
    {
      onSuccess: (data) => {
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
    () => getBadgesCreator(podcast, 12, page, 'desc'),
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

  const mostraBadgesMaisResgatados = badges && podcast === '';
  const mostraBadgesFiltrados = podcast !== '' && badgesPodcast;

  return (
    <>
      <Helmet>
        <title>NV99 Badges | Mais Resgatados</title>
      </Helmet>

      <Alert
        title="Os emblemas podem demorar para carregar por conta do servidor, pois
            ele fica em modo hibernação para economizar recursos."
      />
      <Filter />

      {mostraBadgesMaisResgatados && (
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
            Emblemas mais resgatados do{' '}
            {podcastNames.find((pdc) => pdc.id === podcast)?.name}
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {badgesPodcast
              .sort((a, b) => b.count - a.count)
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
