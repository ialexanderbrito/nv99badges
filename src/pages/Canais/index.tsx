import { Helmet } from 'react-helmet';

import { useQuery } from '@tanstack/react-query';
import { Creator } from 'types/BadgesProps';

import { CardCreator } from 'components/CardCreator';
import { SkeletonList } from 'components/SkeletonList';

import { useToast } from 'contexts/Toast';

import { getChannels } from 'services/get/badges';

export function Canais() {
  const { toast } = useToast();

  const {
    data: channelsData,

    isLoading: isLoadingChannels,
  } = useQuery(['creators'], () => getChannels(), {
    onError: () => {
      toast.error('Canais não encontrados');
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

        {isLoadingChannels ? (
          <SkeletonList />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {channelsData?.data.results.map((canal: Creator) => (
              <CardCreator creator={canal} />
            ))}
          </div>
        )}
      </>
    </>
  );
}
