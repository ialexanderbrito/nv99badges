import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Card } from 'components/Card';
import { CardCreator } from 'components/CardCreator';
import { CardSkeleton } from 'components/CardSkeleton';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getBadgesSearch, getChannels } from 'services/get/badges';

export function Canais() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { badgesFiltered, searchBadge, setBadgesFiltered } = useBadges();

  const [canais, setCanais] = useState([]);

  const { isLoading } = useQuery(['creators'], () => getChannels(), {
    onSuccess: (data) => {
      setCanais(data.data.results);
    },
    onError: () => {
      navigate(`/canais`);
    },
  });

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
        <title>NV99 Badge | Canais</title>
      </Helmet>

      <div className="bg-dark w-full items-center flex flex-col">
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

        {!verificaBusca && !verificaBadgesBuscadas && (
          <>
            <h1 className="text-white text-2xl font-bold mt-4 mb-4">
              Canais da plataforma
            </h1>

            {isLoading || !canais ? (
              <>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <CardSkeleton key={index} />
                    <CardSkeleton key={index} />
                    <CardSkeleton key={index} />
                  </div>
                ))}
              </>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {canais.map((canal) => (
                  <CardCreator creator={canal} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
