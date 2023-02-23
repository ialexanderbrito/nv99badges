import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';

import { Alert } from 'components/Alert';
import { AllBadges } from 'components/AllBadges';
import { Filter } from 'components/FIlter';
import { PodcastBadges } from 'components/PodcastBadges';
import { SkeletonList } from 'components/SkeletonList';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getBadges, getBadgesCreator } from 'services/get/badges';

export function MaisResgatados() {
  const { toast } = useToast();

  const { page, podcast, setBadges, setBadgesPodcast, setTotalBadges } =
    useBadges();

  const {
    data: badgesData,
    isLoading: isLoadingBadges,
    isError: isErrorBadges,
  } = useQuery(['badges', page], () => getBadges(36, page, 'desc'), {
    onSuccess: (data) => {
      setTotalBadges(data.data.total);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: () => {
      toast.error('Não foram encontrados mais badges', { id: 'toast' });
    },
    cacheTime: 1000 * 60 * 60 * 3,
  });

  const {
    data: badgesPodcastData,
    isLoading: isLoadingPodcast,
    isError: isErrorPodcast,
  } = useQuery(
    ['badgesPodcast', page],
    async () => await getBadgesCreator(podcast, 36, page, 'desc'),
    {
      onSuccess: (data) => {
        setTotalBadges(data.data.total);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: () => {
        toast.error(
          `Não foram encontrados mais badges do ${
            podcastNames.find((pod) => pod.creator_profile_id === podcast)
              ?.label
          }`,
          {
            id: 'toast',
          },
        );
      },
      cacheTime: 1000 * 60 * 60 * 3,
      enabled: podcast !== '',
    },
  );

  useEffect(() => {
    if (podcast) {
      setBadgesPodcast(badgesPodcastData?.data.results);
    } else {
      setBadges(badgesData?.data.results);
    }
  }, [badgesData, badgesPodcastData, podcast]);

  if (isErrorPodcast) {
    return (
      <>
        <Alert title="Os emblemas podem demorar para carregar por conta do servidor, pois ele fica em modo hibernação para economizar recursos." />
        <Filter podcastNames={podcastNames} />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl font-bold mt-4 mb-4 text-center">
            Não foram encontrados badges do{' '}
            {
              podcastNames.find((pod) => pod.creator_profile_id === podcast)
                ?.label
            }
          </h1>
        </div>
      </>
    );
  }

  if (isErrorBadges) {
    return (
      <>
        <Alert title="Os emblemas podem demorar para carregar por conta do servidor, pois ele fica em modo hibernação para economizar recursos." />
        <Filter podcastNames={podcastNames} />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl font-bold mt-4 mb-4 text-center">
            Não foram encontrados badges
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
      <Alert title="Os emblemas podem demorar para carregar por conta do servidor, pois ele fica em modo hibernação para economizar recursos." />
      <Filter podcastNames={podcastNames} />

      {isLoadingPodcast && podcast ? (
        <SkeletonList />
      ) : (
        <>
          <div className={cx({ hidden: !podcast })}>
            <PodcastBadges
              title={`Emblemas mais resgatados do ${
                podcastNames.find((pod) => pod.creator_profile_id === podcast)
                  ?.label
              }`}
              badgesPodcastData={badgesPodcastData?.data.results}
              podcast={podcast}
            />
          </div>
        </>
      )}

      {isLoadingBadges ? (
        <SkeletonList />
      ) : (
        <>
          <div className={cx({ hidden: podcast })}>
            <AllBadges
              title="Emblemas mais resgatados"
              badges={badgesData?.data.results}
            />
          </div>
        </>
      )}
    </>
  );
}
