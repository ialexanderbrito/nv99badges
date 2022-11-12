import { Router } from "express";
import { apiBadges } from "../../api";

const routes = Router();

routes.get('/badges', async (request, response) => {
  const { page = 1, limit = 10, order = 'asc' } = request.query;

  try {
    const { data } = await apiBadges.get(`market/badges?order=oldest&min_value=0&max_value=1000&has_normal=true&has_secret=true&in_market=true&not_in_market=true`);

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    const orderBy = arrayPrincipal.sort((a: any, b: any) => {
      if (order === 'asc') {
        return a.count - b.count;
      }

      if (order === 'recent') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return dateB.getTime() - dateA.getTime();
      }

      return b.count - a.count;
    });

    const total = orderBy.length;

    if (startIndex > arrayPrincipal.length) {
      return response.status(404).json({ message: 'Page not found' });
    }

    if (orderBy.length === 0) {
      return response.status(404).json({ message: 'Not found' });
    }

    const results: any = {};

    if (endIndex < arrayPrincipal.length) {
      results.next = {
        page: Number(page) + 1,
        limit: Number(limit),
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: Number(page) - 1,
        limit: Number(limit),
      };
    }

    results.results = orderBy.slice(startIndex, endIndex);

    results.results = arrayPrincipal.slice(startIndex, endIndex);

    results.total = total;

    return response.status(200).json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

routes.get('/badge/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const { data } = await apiBadges.get(`market/badges?order=oldest&min_value=0&max_value=1000&has_normal=true&has_secret=true&in_market=true&not_in_market=true`);

    const {data: badgeValue} = await apiBadges.get(`market/negotiations?code=${id}&type=TRADE&filter=lower_price`);

    const valueBadgeMedia = badgeValue.results;

    const badges = data.badges;

    let arrayPrincipal: any = [];
    let arraySecundary: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    for (const item of valueBadgeMedia) {
      arraySecundary = [].concat(arraySecundary, item);
    }

    const mediaBadgeValue = arraySecundary.map((item: any) => item?.value);

    const somaBadges = mediaBadgeValue.reduce((a: any, b: any) => a + b, 0).toFixed(2);

    const mediaBadge = (somaBadges / mediaBadgeValue.length).toFixed(2);

    const mediaBadgeNumber = Number(mediaBadge);


    const badge = arrayPrincipal.find((badge: any) => badge.code === id);

    if (!badge) {
      return response.status(404).json({ message: 'Not found' });
    }

    if(badgeValue.results.length === 0) {
      return response.status(200).json({
        badge,
        media_price_badge: 0,
      });
    }

    const badgeValueMedia = {
      ...badge,
      media_price_badge: mediaBadgeNumber,
    }

    return response.status(200).json(badgeValueMedia);
    


  } catch (error) {
    return response.status(500).json({ message: 'Error badge not found' });
  }
});

routes.get('/badges/creator/:id', async (request, response) => {
  const { id } = request.params;
  const { page = 1, limit = 10, order = 'asc' } = request.query;

  try {
    const { data } = await apiBadges.get(`market/badges?order=oldest&min_value=0&max_value=1000&has_normal=true&has_secret=true&in_market=true&not_in_market=true`);

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const creatorBadges = arrayPrincipal.filter((badge: any) => badge.creator_profile_id === id);

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    const orderBy = creatorBadges.sort((a: any, b: any) => {
      if (order === 'asc') {
        return a.count - b.count;
      }

      if (order === 'recent') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return dateB.getTime() - dateA.getTime();
      }

      return b.count - a.count;
    });

    if (startIndex > creatorBadges.length) {
      return response.status(404).json({ message: 'Page not found' });
    }

    if (orderBy.length === 0) {
      return response.status(404).json({ message: 'Not found' });
    }

    const results: any = {};

    if (endIndex < creatorBadges.length) {
      results.next = {
        page: Number(page) + 1,
        limit: Number(limit),
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: Number(page) - 1,
        limit: Number(limit),
      };
    }


    results.results = orderBy.slice(startIndex, endIndex);

    results.results = creatorBadges.slice(startIndex, endIndex);

    return response.status(200).json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Error on get badge' });
  }
});

routes.get('/badges/search', async (request, response) => {
  const { code } = request.query;

  try {
    const { data } = await apiBadges.get(`market/badges?order=oldest&min_value=0&max_value=1000&has_normal=true&has_secret=true&in_market=true&not_in_market=true`);

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const results = arrayPrincipal.filter((badge: any) => (badge.name.toLowerCase().includes(code?.toString().toLowerCase())) || (badge.code.toLowerCase().includes(code?.toString().toLowerCase())) || (badge.description.toLowerCase().includes(code?.toString().toLowerCase())));

    return response.json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

export default routes;