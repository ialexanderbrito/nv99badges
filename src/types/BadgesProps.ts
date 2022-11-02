export interface Status {
  error: boolean;
  message: string;
  reason?: any;
}

export interface Badge {
  update_view: Date;
  status: boolean;
  creator_profile_id: string;
  serialized: boolean;
  count: number;
  description: string;
  starts_on: Date;
  created_at: Date;
  to_update: boolean;
  name: string;
  creators: string[];
  high: string;
  artists: string[];
  secret: boolean;
  expires_at: Date;
  code: string;
  updated_at: Date;
  voucher: boolean;
  src: string;
  hq: boolean;
  variants: string[];
  badge_id: string;
  percentage_badge: number;
  artist_id?: any;
  serial_number?: number;
}

export interface Badges {
  status: Status;
  badges: Badge[];
  total_badges: number;
}
