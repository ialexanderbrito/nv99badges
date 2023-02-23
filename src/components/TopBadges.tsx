import { useNavigate } from 'react-router';

import { Badge } from 'types/BadgesProps';

import { TopCard } from 'components/TopCard';

export function TopBadges({ badges }: { badges: Badge[] }) {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-white text-2xl font-bold mt-4 mb-4 text-center">
        🏆 Top 3 🏆
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {badges.slice(0, 3).map((badge: Badge) => (
          <TopCard
            key={badge.id}
            badge={badge}
            index={badges.indexOf(badge)}
            onClick={() => {
              navigate(`/badge/${badge.code}`);
            }}
          />
        ))}
      </div>
    </>
  );
}
