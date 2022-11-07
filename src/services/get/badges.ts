import { api } from 'services/api';

export async function getBadges(limit: number, page: number, sort: string) {
  const { data, status } = await api.get(
    `badges?limit=${limit}&page=${page}&order=${sort}`,
  );

  return { data, status };
}

export async function getBadgeById(code: string) {
  const { data, status } = await api.get(`badge/${code}`);

  return { data, status };
}

export async function getBadgesSearch(search: string) {
  const { data, status } = await api.get(`badges/search?code=${search}`);

  return { data, status };
}

export async function getBadgesCreator(
  id: string,
  limit: number,
  page: number,
  sort: string,
) {
  const { data, status } = await api.get(
    `badges/creator/${id}?limit=${limit}&page=${page}&order=${sort}`,
  );

  return { data, status };
}
export async function getUser(
  username: string,
  limit: number,
  page: number,
  sort: string,
) {
  const { data, status } = await api.get(
    `user/${username}?limit=${limit}&page=${page}&order=${sort}`,
  );

  return { data, status };
}

export async function getTotalBadgesUser(username: string) {
  const { data, status } = await api.get(`badge/count/${username}`);

  return { data, status };
}