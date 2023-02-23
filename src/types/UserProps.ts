export interface Next {
  page: number;
  limit: number;
}

export interface Result {
  code: string;
  redeemed_at: Date;
  user_badge_id: string;
  creator_profile_id: string;
  description: string;
  expires_at: Date;
  high: string;
  hq: boolean;
  name: string;
  pinned: boolean;
  secret: boolean;
  serial_number: number;
  serialized: boolean;
  src: string;
  starts_on: Date;
  status: boolean;
}

export interface Profile {
  label: string;
  value: any;
}

export interface ProfileXP {
  points_normal_badge: number;
  points_secret_badge: number;
  total_points: number;
  elo: string;
  src: string;
  level: number;
  next_xp: number;
  progress: string;
  xp: number;
}

export interface UserProps {
  next: Next;
  results: Result[];
  profile: Profile[];
  profileXP: ProfileXP;
  total: number;
}
