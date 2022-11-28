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
  normal: boolean = true,
  secret: boolean = true,
  creators?: string,
) {
  const { data, status } = await api.get(
    `users/${username}?limit=${limit}&page=${page}&order=${sort}&normal=${normal}&secret=${secret}&creators=${creators}`,
  );

  return { data, status };
}

export async function getChannels() {
  const { data, status } = await api.get(`creators?order=subs&limit=50`);

  return { data, status };
}

export async function getGraph(code: string) {
  const { data, status } = await api.get(`graph?code=${code}`);

  return { data, status };
}

export async function getSearch(text: string) {
  const { data, status } = await api.get(`search?text=${text}`);

  return { data, status };
}

export async function getRanking(limit: number, page: number) {
  const { data, status } = await api.get(`ranking?limit=${limit}&page=${page}`);

  return { data, status };
}
