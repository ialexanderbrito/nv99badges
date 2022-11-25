import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge, Profile, ProfileXp } from 'types/BadgesProps';

interface BadgeProps {
  badges: Badge[];
  setBadges: (badges: any) => void;
  badgesPodcast: Badge[];
  setBadgesPodcast: (badgesPodcast: any) => void;
  filter: boolean;
  setFilter: (filter: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  order: string;
  setOrder: (order: string) => void;
  page: number;
  setPage: (page: number) => void;
  podcast: string;
  setPodcast: (podcast: string) => void;
  pathname: string;
  handleSelectedMaisRaros: () => void;
  handleSelectedMaisResgatados: () => void;
  handleSelectedMaisRecentes: () => void;
  handleSelectedOrder: () => void;
  loadMoreBadges: () => void;
  user: Badge[];
  setUser: (user: any) => void;
  totalBadges: number;
  setTotalBadges: (totalBadges: number) => void;
  isLoadingPage: boolean;
  setIsLoadingPage: (isLoadingPage: boolean) => void;
  profile: Profile[];
  setProfile: (profile: any) => void;
  profileXp: ProfileXp;
  setProfileXp: (profileXp: any) => void;
  filterBadgeUser: string;
  setFilterBadgeUser: (filterBadgeUser: string) => void;
  isSecret: boolean;
  setIsSecret: (isSecret: boolean) => void;
  isNormal: boolean;
  setIsNormal: (isNormal: boolean) => void;
}

const BadgeContext = createContext<BadgeProps>({} as any);

export const BadgeProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const [podcast, setPodcast] = useState('');
  const [filter, setFilter] = useState(false);
  const [order, setOrder] = useState('desc');
  const [badgesPodcast, setBadgesPodcast] = useState<Badge[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [user, setUser] = useState<Badge[]>([]);
  const [profile, setProfile] = useState<Profile[]>([]);
  const [profileXp, setProfileXp] = useState<ProfileXp>({} as any);
  const [totalBadges, setTotalBadges] = useState(0);

  const [filterBadgeUser, setFilterBadgeUser] = useState('lower_serial');
  const [isSecret, setIsSecret] = useState(true);
  const [isNormal, setIsNormal] = useState(true);

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

  function loadMoreBadges() {
    setPage(page + 1);
  }

  return (
    <BadgeContext.Provider
      value={{
        badges,
        badgesPodcast,
        filter,
        isLoading,
        order,
        page,
        podcast,
        setBadges,
        setBadgesPodcast,
        setFilter,
        setIsLoading,
        setOrder,
        setPage,
        setPodcast,
        pathname,
        handleSelectedMaisRaros,
        handleSelectedMaisResgatados,
        handleSelectedMaisRecentes,
        handleSelectedOrder,
        loadMoreBadges,
        user,
        setUser,
        totalBadges,
        setTotalBadges,
        isLoadingPage,
        setIsLoadingPage,
        profile,
        setProfile,
        profileXp,
        setProfileXp,
        filterBadgeUser,
        setFilterBadgeUser,
        isSecret,
        setIsSecret,
        isNormal,
        setIsNormal,
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
