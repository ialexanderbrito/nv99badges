import { Badge } from 'types/BadgesProps';

export interface BadgeProps {
  badges: Badge[];
  setBadges: (badges: any) => void;
  badgesPodcast: Badge[];
  setBadgesPodcast: (badgesPodcast: any) => void;
  filter: boolean;
  setFilter: (filter: boolean) => void;
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
  totalBadges: number;
  setTotalBadges: (totalBadges: number) => void;
  filterBadgeUser: string;
  setFilterBadgeUser: (filterBadgeUser: string) => void;
  isSecret: boolean;
  setIsSecret: (isSecret: boolean) => void;
  isNormal: boolean;
  setIsNormal: (isNormal: boolean) => void;
  selectedPodcast: string;
  setSelectedPodcast: (selectedPodcast: string) => void;
}
