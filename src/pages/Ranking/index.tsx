import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Ranking as RankingProps } from 'types/BadgesProps';

import { Alert } from 'components/Alert';
import { Button } from 'components/Button';
import { CardRanking } from 'components/CardRanking';
import { CardSkeleton } from 'components/CardSkeleton';
import { TopRanking } from 'components/TopRanking';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getRanking } from 'services/get/badges';

export function Ranking() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    badges,
    page,
    podcast,

    loadMoreBadges,
  } = useBadges();

  const [ranking, setRanking] = useState<RankingProps[]>([]);

  const { isLoading } = useQuery(
    ['ranking', page],
    () => getRanking(24, page),
    {
      onSuccess: (data) => {
        setRanking((old: RankingProps[]) => [...old, ...data.data.results]);
      },
      onError: () => {
        toast.error('Não foram encontrados mais usuários', { id: 'toast' });
      },
      staleTime: 0,
    },
  );

  const mostraBadgesMaisRaros = badges && podcast === '';

  return (
    <>
      <Helmet>
        <title>NV99 Badges | Mais Raros</title>
      </Helmet>

      <Alert
        title="Os emblemas podem demorar para carregar por conta do servidor, pois
            ele fica em modo hibernação para economizar recursos."
      />

      {mostraBadgesMaisRaros && (
        <>
          <h1 className="text-white text-2xl font-bold mt-4 mb-4">
            🏆 Top 3 🏆
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {ranking.slice(0, 3).map((rnkg, index) => (
              <TopRanking
                ranking={rnkg}
                key={index}
                index={index}
                onClick={() => {
                  navigate(`/user/${rnkg.username}`);
                }}
              />
            ))}
          </div>

          <h1 className="text-white text-2xl font-bold mt-4 mb-4">
            O restante da galera
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {ranking.slice(3).map((rnkg) => (
              <CardRanking
                ranking={rnkg}
                key={rnkg.position}
                onClick={() => {
                  navigate(`/user/${rnkg.username}`);
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
