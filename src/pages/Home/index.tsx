import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';

import { Alert } from 'components/Alert';
import { AllBadges } from 'components/AllBadges';
import { Filter } from 'components/FIlter';
import { PodcastBadges } from 'components/PodcastBadges';
import { SkeletonList } from 'components/SkeletonList';
import { TopBadges } from 'components/TopBadges';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getBadges, getBadgesCreator } from 'services/get/badges';

export function Homepage() {
  const { toast } = useToast();

  const {
    page,
    podcast,
    setBadges,
    setBadgesPodcast,
    setTotalBadges,
    totalBadges,
  } = useBadges();

  const { data: badgesData, isLoading: isLoadingBadges } = useQuery(
    ['badges', page],
    () => getBadges(36, page, 'asc'),
    {
      onSuccess: (data) => {
        setTotalBadges(data.data.total);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: () => {
        toast.error('Não foram encontrados mais badges', { id: 'toast' });
      },
      cacheTime: 1000 * 60 * 60 * 3,
    },
  );

  const { data: badgesPodcastData, isLoading: isLoadingPodcast } = useQuery(
    ['badgesPodcast', page],
    () => getBadgesCreator(podcast, 36, page, 'asc'),
    {
      onSuccess: (data) => {
        setTotalBadges(data.data.total);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: () => {
        toast.error(
          `Não foram encontrados mais badges do ${
            podcastNames.find(
              (podcastName) => podcastName.creator_profile_id === podcast,
            )?.label
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
              title={`Todos os emblemas do{' '}
              ${
                podcastNames.find((pod) => pod.creator_profile_id === podcast)
                  ?.label
              }`}
              podcast={podcast}
              badgesPodcastData={badgesPodcastData?.data.results}
            />
          </div>
        </>
      )}

      {isLoadingBadges ? (
        <SkeletonList />
      ) : (
        <>
          <div className={cx({ hidden: podcast })}>
            {page === 1 && <TopBadges badges={badgesData?.data.results} />}

            <AllBadges
              isTop
              badges={badgesData?.data.results}
              title={`Todos os ${
                totalBadges ? ` ${totalBadges + 3} ` : '...'
              } emblemas`}
            />
          </div>
        </>
      )}
    </>
  );
}
