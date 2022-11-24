import { api } from './../../api';
import { Router } from 'express';

const routes = Router();

routes.get('/users/:id', async (request, response) => {
  const { id } = request.params;
  const { page = 1, limit = 10, order = 'asc' } = request.query;

  try {
    const { data } = await api.get(`badges/user_badges_search?username=${id}`);

    const { data: profile } = await api.get(
      `badges/profile_card?username=${id}`,
    );

    const profileStats = profile.statistics;

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const totalBadgesNormal = arrayPrincipal.filter(
      (badge: any) => badge.secret === false,
    );

    const totalBadgesSecret = arrayPrincipal.filter(
      (badge: any) => badge.secret === true,
    );

    const pointsNormalBadge = totalBadgesNormal.length * 1;
    const pointsSecretBadge = totalBadgesSecret.length * 5;

    const totalPoints = pointsNormalBadge + pointsSecretBadge;

    const xp = totalPoints * 2;
    const level = Math.floor(0.1 * Math.sqrt(xp)) * 10;
    const nextXp = Math.pow((level + 10) / 10, 2) * 100;

    const progress = (xp / nextXp) * 100;

    const elos = [
      { name: 'Bronze', value: 0, src: `${process.env.LINK_IMAGE}/bronze.svg` },
      {
        name: 'Silver',
        value: 10,
        src: `${process.env.LINK_IMAGE}/silver.svg`,
      },
      { name: 'Gold', value: 20, src: `${process.env.LINK_IMAGE}/gold.svg` },
      {
        name: 'Platinum',
        value: 30,
        src: `${process.env.LINK_IMAGE}/platinum.svg`,
      },
      {
        name: 'Diamond',
        value: 40,
        src: `${process.env.LINK_IMAGE}/diamond.svg`,
      },
      {
        name: 'Master',
        value: 50,
        src: `${process.env.LINK_IMAGE}/master.svg`,
      },
      {
        name: 'Grandmaster',
        value: 60,
        src: `${process.env.LINK_IMAGE}/grandmaster.svg`,
      },
      {
        name: 'Challenger',
        value: 70,
        src: `${process.env.LINK_IMAGE}/challenger.svg`,
      },
    ];

    const elo = elos.filter((item) => item.value <= level);
    const eloUser = elo[elo.length - 1].name;
    const eloImage = elo[elo.length - 1].src;

    const profileExperience = {
      points_normal_badge: pointsNormalBadge,
      points_secret_badge: pointsSecretBadge,
      total_points: totalPoints,
      xp,
      level,
      next_xp: nextXp,
      progress,
      elo: eloUser,
      src: eloImage,
    };

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    const orderBy = arrayPrincipal.sort((a: any, b: any) => {
      if (order === 'asc') {
        return a.count - b.count;
      }

      if (order === 'recent') {
        const dateA = new Date(a.expires_at);
        const dateB = new Date(b.expires_at);

        return dateB.getTime() - dateA.getTime();
      }

      if (order === 'serial') {
        return a.serial_number - b.serial_number;
      }

      return b.count - a.count;
    });

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

    results.profile = profileStats;

    results.profileXP = profileExperience;

    // results.profile.xp = xp;

    return response.status(200).json(results);
  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

export default routes;
