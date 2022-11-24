/* eslint-disable camelcase */
import { api } from './../../api';
import { Router } from 'express';

const routes = Router();

routes.get('/users/:id', async (request, response) => {
  const { id } = request.params;
  const {
    page = 1,
    limit = 10,
    order = 'lower_serial',
    normal = true,
    secret = true,
  } = request.query;

  try {
    const { data } = await api.get(
      `badges/user_badges_search?username=${id}&order_by=${order}&normal_badges=${normal}&secret_badges=${secret}`,
    );

    const { data: profile } = await api.get(
      `badges/profile_card?username=${id}`,
    );

    const profileStats = profile.statistics;

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const totalBadgesNormal = profileStats.find(
      (badge: any) => badge.label === 'Emblemas únicos',
    ).value;

    const totalBadgesSecret = profileStats.find(
      (badge: any) => badge.label === 'Emblemas secretos',
    ).value;

    const pointsNormalBadge = (totalBadgesNormal - totalBadgesSecret) * 1;
    const pointsSecretBadge = totalBadgesSecret * 5;

    const totalPoints = pointsNormalBadge + pointsSecretBadge;

    const baseLevel = 1;
    const baseExp = 0;

    const exp = totalPoints;
    const expForNextLevel = 100;

    const xp = exp - baseExp;

    const level = Math.floor(exp / expForNextLevel) + baseLevel;

    const expForLevel = exp - (level - baseLevel) * expForNextLevel;

    const expToLevelUp = expForNextLevel - expForLevel;

    const percentageForLevel =
      (expForLevel / (expForNextLevel - baseExp)) * 100;

    const elos = [
      {
        name: 'Bronze',
        value: 0,
        src: `${process.env.LINK_IMAGE}/images/bronze.svg`,
      },
      {
        name: 'Prata',
        value: 5,
        src: `${process.env.LINK_IMAGE}/images/silver.svg`,
      },
      {
        name: 'Ouro',
        value: 10,
        src: `${process.env.LINK_IMAGE}/images/gold.svg`,
      },
      {
        name: 'Platina',
        value: 15,
        src: `${process.env.LINK_IMAGE}/images/platinum.svg`,
      },
      {
        name: 'Diamante',
        value: 20,
        src: `${process.env.LINK_IMAGE}/images/diamond.svg`,
      },
      {
        name: 'Master',
        value: 25,
        src: `${process.env.LINK_IMAGE}/images/master.svg`,
      },
      {
        name: 'Grandmaster',
        value: 30,
        src: `${process.env.LINK_IMAGE}/images/grandmaster.svg`,
      },
      {
        name: 'Radiante',
        value: 35,
        src: `${process.env.LINK_IMAGE}/images/challenger.svg`,
      },
    ];

    const elo = elos.filter((item) => item.value <= level);
    const eloUser = elo[elo.length - 1].name;
    const eloImage = elo[elo.length - 1].src;

    const profileExperience = {
      points_normal_badge: pointsNormalBadge,
      points_secret_badge: pointsSecretBadge,
      total_points: exp,
      elo: eloUser,
      src: eloImage,
      level,
      next_xp: expToLevelUp,
      progress: percentageForLevel.toFixed(2),
      xp,
    };

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    if (startIndex > arrayPrincipal.length) {
      return response.status(404).json({ message: 'Page not found' });
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

    results.results = arrayPrincipal.slice(startIndex, endIndex);

    results.profile = profileStats;

    results.profileXP = profileExperience;

    return response.status(200).json(results);
  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

export default routes;
