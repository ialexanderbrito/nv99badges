import { useNavigate } from 'react-router';

import { Badge } from 'types/BadgesProps';

import { Card } from 'components/Card';
import { Pagination } from 'components/Pagination';

import { useBadges } from 'contexts/Badges';

export function PodcastBadges({
  podcast,
  badgesPodcastData,
  title,
}: {
  podcast: string;
  badgesPodcastData: Badge[];
  title: string;
}) {
  const navigate = useNavigate();
  const { page, setPage, totalBadges } = useBadges();

  return (
    <>
      <h1 className="text-white text-2xl font-bold mt-4 mb-4 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {badgesPodcastData?.map((badge: Badge) => (
          <Card
            key={badge.id}
            badge={badge}
            onClick={() => navigate(`/badge/${badge.id}`)}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        handlePage={setPage}
        pages={Math.ceil(totalBadges / 36)}
        key={page}
      />
    </>
  );
}
