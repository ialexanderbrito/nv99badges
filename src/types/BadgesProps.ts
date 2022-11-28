/* eslint-disable no-unused-vars */
export interface Status {
  error: boolean;
  message: string;
  reason?: any;
}

export interface CreatorProfile {
  description: string;
  icon: string;
  label: string;
  name: string;
}

export interface Badge {
  code_market: string;
  market_value: number;
  code: string;
  id: string;
  artists?: any;
  count: number;
  created_at: Date;
  creator_profile_id: string;
  creators?: any;
  description: string;
  expires_at: Date;
  high: string;
  hq: boolean;
  name: string;
  secret: boolean;
  src: string;
  starts_on: Date;
  to_update?: any;
  status: boolean;
  updated_at: Date;
  variants?: any;
  voucher?: any;
  artist_id?: any;
  creator_profile: CreatorProfile;
  serialized: boolean;
  redeemed: boolean;
  serial_number: number;
  media_price_badge?: number;
  market_value_change_type?: 'same' | 'up' | 'down';
}

export interface Profile {
  label: string;
  value: any;
}

export interface ProfileXp {
  points_normal_badge: number;
  points_secret_badge: number;
  total_points: number;
  xp: number;
  level: number;
  next_xp: number;
  progress: number;
  elo: string;
  src: string;
}

export interface Badges {
  status: Status;
  badges: Badge[];
  total_badges: number;
}

export interface Next {
  page: number;
  limit: number;
}

export interface Creator {
  subscribers: number;
  name: string;
  label: string;
  creator_profile_id: string;
  subscribed: boolean;
  icon: string;
}

export interface Creators {
  next: Next;
  results: Creator[];
  total: number;
}

export interface GraphProps {
  labels: string[];
  dataset: number[];
}

export enum VariationRanking {
  Down = 'DOWN',
  Stable = 'STABLE',
  Up = 'UP',
}

export interface Ranking {
  username: string;
  variation_ranking: VariationRanking;
  profile_picture: null | string;
  position: number;
  premium: null | string;
  qtd: number;
  bio: null | string;
}
