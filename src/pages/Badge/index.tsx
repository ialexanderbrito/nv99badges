import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { NotFound } from 'pages/NotFound';

import { BadgeDetail } from 'components/BadgeDetails';
import { BadgeGraph } from 'components/BadgeGraph';
import { BadgeSkeleton } from 'components/BadgeSkeleton';

import { useToast } from 'contexts/Toast';

import { getBadgeById } from 'services/get/badges';

export function Badge() {
  const { toast } = useToast();
  const { code } = useParams();

  const {
    data: badgeData,
    isLoading: isLoadingBadge,
    isError: isErrorBadge,
  } = useQuery(['badge', code], () => getBadgeById(String(code)), {
    onSuccess: () => {
      toast.success('Badge carregado', {
        id: 'toast',
      });
    },
    onError: () => {
      toast.error('Emblema não encontrado');
    },
    cacheTime: 1000 * 60 * 60 * 3,
  });

  if (isErrorBadge) {
    return (
      <NotFound title={`Infelizmente o emblema ${code} não foi encontrado`} />
    );
  }

  return (
    <>
      <Helmet>
        <title>NV99 Badge | {badgeData?.data.code || ''}</title>
      </Helmet>

      {isLoadingBadge ? (
        <div className="mt-16 flex flex-col h-[calc(100vh-13.5rem)]">
          <BadgeSkeleton />
        </div>
      ) : (
        <div className="w-full">
          <BadgeDetail data={badgeData?.data} />

          <BadgeGraph code={badgeData.data.code} />
        </div>
      )}
    </>
  );
}
