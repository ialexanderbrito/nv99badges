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
}

export interface Badges {
  status: Status;
  badges: Badge[];
  total_badges: number;
}
