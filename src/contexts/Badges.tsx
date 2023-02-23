import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BadgeProps } from 'types/BadgeContextProps';
import { Badge } from 'types/BadgesProps';

const BadgeContext = createContext<BadgeProps>({} as any);

export const BadgeProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  // Badges
  const [badgesPodcast, setBadgesPodcast] = useState<Badge[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalBadges, setTotalBadges] = useState(0);

  // Filter
  const [filter, setFilter] = useState(false);
  const [order, setOrder] = useState('desc');
  const [podcast, setPodcast] = useState('');

  // User
  const [filterBadgeUser, setFilterBadgeUser] = useState('lower_serial');
  const [isSecret, setIsSecret] = useState(true);
  const [isNormal, setIsNormal] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState('');

  function handleSelectedMaisRaros() {
    window.location.replace('/mais-raros');
    navigate('/mais-raros', { replace: true });
    setBadges([]);
    setPodcast('');
  }

  function handleSelectedMaisResgatados() {
    window.location.replace('/mais-resgatados');
    navigate('/mais-resgatados', { replace: true });
    setBadges([]);
    setPodcast('');
  }

  function handleSelectedMaisRecentes() {
    window.location.replace('/mais-recentes');
    navigate('/mais-recentes', { replace: true });
    setBadges([]);
    setPodcast('');
  }

  function handleSelectedOrder() {
    if (order === 'desc') {
      setOrder('recent');
    } else {
      setOrder('desc');
    }
  }

  return (
    <BadgeContext.Provider
      value={{
        badges,
        badgesPodcast,
        filter,
        order,
        page,
        podcast,
        setBadges,
        setBadgesPodcast,
        setFilter,
        setOrder,
        setPage,
        setPodcast,
        pathname,
        handleSelectedMaisRaros,
        handleSelectedMaisResgatados,
        handleSelectedMaisRecentes,
        handleSelectedOrder,
        totalBadges,
        setTotalBadges,
        filterBadgeUser,
        setFilterBadgeUser,
        isSecret,
        setIsSecret,
        isNormal,
        setIsNormal,
        selectedPodcast,
        setSelectedPodcast,
      }}
    >
      {children}
    </BadgeContext.Provider>
  );
};

export function useBadges() {
  const context = useContext(BadgeContext);

  return context;
}
