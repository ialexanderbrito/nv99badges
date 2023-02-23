import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Ranking as RankingProps } from 'types/BadgesProps';

import { Alert } from 'components/Alert';
import { CardRanking } from 'components/CardRanking';
import { Pagination } from 'components/Pagination';
import { SkeletonList } from 'components/SkeletonList';
import { TopRanking } from 'components/TopRanking';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getRanking } from 'services/get/badges';

export function Ranking() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { page, setPage, setTotalBadges, totalBadges } = useBadges();

  const {
    data: rankingData,
    isLoading: isLoadingRanking,
    isError: isErrorRanking,
  } = useQuery(['ranking', page], () => getRanking(36, page), {
    onSuccess: (data) => {
      setTotalBadges(data.data.total);
    },
    onError: () => {
      toast.error('Não foram encontrados mais usuários', { id: 'toast' });
    },
    cacheTime: 1000 * 60 * 60 * 3,
  });

  if (isErrorRanking) {
    return (
      <>
        <Alert title="Os emblemas podem demorar para carregar por conta do servidor, pois ele fica em modo hibernação para economizar recursos." />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl font-bold mt-4 mb-4 text-center">
            Não foi possível carregar os usuários
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>NV99 Badges | Mais Raros</title>
      </Helmet>

      <Alert
        title="Os emblemas podem demorar para carregar por conta do servidor, pois
            ele fica em modo hibernação para economizar recursos."
      />

      {isLoadingRanking ? (
        <SkeletonList />
      ) : (
        <>
          {page === 1 && (
            <>
              <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                🏆 Top 3 🏆
              </h1>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {rankingData?.data.results
                  .slice(0, 3)
                  .map((ranking: RankingProps) => (
                    <TopRanking
                      key={ranking.username}
                      ranking={ranking}
                      onClick={() => navigate(`/user/${ranking.username}`)}
                      index={rankingData?.data.results.indexOf(ranking)}
                    />
                  ))}
              </div>
            </>
          )}

          <h1 className="text-white text-2xl font-bold mt-4 mb-4">
            O restante da galera
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {rankingData?.data.results
              .slice(page === 1 ? 3 : 0, page === 1 ? 36 : 36)
              .map((ranking: RankingProps) => (
                <CardRanking
                  key={ranking.username}
                  ranking={ranking}
                  onClick={() => navigate(`/user/${ranking.username}`)}
                />
              ))}
          </div>
        </>
      )}

      <Pagination
        currentPage={page}
        handlePage={setPage}
        pages={Math.ceil(totalBadges / 36)}
        key={page}
      />
    </>
  );
}
