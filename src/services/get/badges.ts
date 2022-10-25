import { api, badgeApi } from 'services/api';

export async function getBadges() {
  const { data, status } = await api.get(`/v1/badges?sort=desc`);

  return { data, status };
}

export async function getBadgeById(code: string) {
  const { data, status } = await badgeApi.get(`?code=${code}`);

  return { data, status };
}
