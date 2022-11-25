import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { CardCreator } from 'components/CardCreator';
import { CardSkeleton } from 'components/CardSkeleton';

import { getChannels } from 'services/get/badges';

export function Canais() {
  const navigate = useNavigate();

  const [canais, setCanais] = useState([]);

  const { isLoading } = useQuery(['creators'], () => getChannels(), {
    onSuccess: (data) => {
      setCanais(data.data.results);
    },
    onError: () => {
      navigate(`/canais`);
    },
  });

  return (
    <>
      <Helmet>
        <title>NV99 Badge | Canais</title>
      </Helmet>

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
    </>
  );
}
