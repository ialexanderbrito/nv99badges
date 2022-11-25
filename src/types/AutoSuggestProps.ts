export interface User {
  artist: boolean;
  bio: string;
  profile_locked: boolean;
  profile_picture?: any;
  unique_id: string;
  username: string;
}

export interface Studio {
  name: string;
  label: string;
  content_tag?: any;
  creator_profile_id: string;
  verified: boolean;
  description: string;
  icon: string;
  _id: string;
}

export interface Badge {
  code: string;
  count: number;
  created_at: Date;
  creator_profile_id: string;
  description: string;
  expires_at: Date;
  high: string;
  hq: boolean;
  name: string;
  serialized: boolean;
  src: string;
  starts_on: Date;
  status: boolean;
  update_view: Date;
  updated_at: Date;
  _id: string;
  secret?: boolean;
  artists: any[];
  creators: string[];
  to_update?: boolean;
  variants: any[];
  voucher?: boolean;
}

export interface AutoSuggestProps {
  users: User[];
  studios: Studio[];
  badges: Badge[];
}
