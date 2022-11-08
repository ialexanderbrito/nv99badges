import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from 'types/BadgesProps';

import { getTotalBadgesUser, getUser } from 'services/get/badges';

import { useToast } from './Toast';

interface BadgeProps {
  badges: Badge[];
  setBadges: (badges: any) => void;
  badgesFiltered: Badge[];
  setBadgesFiltered: (badgesFiltered: any) => void;
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
  searchBadge: string;
  setSearchBadge: (searchBadge: string) => void;
  pathname: string;
  handleSelectedMaisRaros: () => void;
  handleSelectedMaisResgatados: () => void;
  handleSelectedMaisRecentes: () => void;
  handleSelectedOrder: () => void;
  loadMoreBadges: () => void;
  username: string;
  setUsername: (username: string) => void;
  searchUsername: () => void;
  user: Badge[];
  setUser: (user: any) => void;
  totalBadges: number;
  setTotalBadges: (totalBadges: number) => void;
  isLoadingPage: boolean;
  setIsLoadingPage: (isLoadingPage: boolean) => void;
}

const BadgeContext = createContext<BadgeProps>({} as any);

export const BadgeProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const { toast } = useToast();

  const [searchBadge, setSearchBadge] = useState('');
  const [podcast, setPodcast] = useState('');
  const [filter, setFilter] = useState(false);
  const [order, setOrder] = useState('desc');
  const [badgesFiltered, setBadgesFiltered] = useState<Badge[]>([]);
  const [badgesPodcast, setBadgesPodcast] = useState<Badge[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [username, setUsername] = useState('');
  const [user, setUser] = useState<Badge[]>([]);
  const [totalBadges, setTotalBadges] = useState(0);

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

  async function searchUsername() {
    try {
      setIsLoadingPage(true);
      const { data: total } = await getTotalBadgesUser(username);
      const { data } = await getUser(username, 12, page, 'serial');

      setUser(data.results);
      setTotalBadges(total.total);

      navigate(`/user/${username}`, { replace: true });
      setIsLoadingPage(false);
    } catch (error) {
      toast.error('Usuário não encontrado ou pefil privado');
      setIsLoadingPage(false);
    } finally {
      setIsLoadingPage(false);
    }
  }

  return (
    <BadgeContext.Provider
      value={{
        badges,
        badgesFiltered,
        badgesPodcast,
        filter,
        isLoading,
        order,
        page,
        podcast,
        searchBadge,
        setBadges,
        setBadgesFiltered,
        setBadgesPodcast,
        setFilter,
        setIsLoading,
        setOrder,
        setPage,
        setPodcast,
        setSearchBadge,
        pathname,
        handleSelectedMaisRaros,
        handleSelectedMaisResgatados,
        handleSelectedMaisRecentes,
        handleSelectedOrder,
        loadMoreBadges,
        username,
        setUsername,
        searchUsername,
        user,
        setUser,
        totalBadges,
        setTotalBadges,
        isLoadingPage,
        setIsLoadingPage,
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
