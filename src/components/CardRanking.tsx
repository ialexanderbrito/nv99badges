import { avatar } from 'assets';
import cx from 'classnames';
import { Ranking } from 'types/BadgesProps';

import { verifyVariationRanking } from 'utils/verifyPositionRanking';

interface BadgeCard {
  ranking: Ranking;
  onClick?: () => void;
}

export function CardRanking(props: BadgeCard) {
  return (
    <div key={props.ranking.position} className="flex flex-col">
      <div
        className={cx(
          'bg-primary w-72 h-[480px] flex flex-col items-center justify-center rounded-md mb-3 overflow-hidden p-3',
          {
            'border border-nv': props.ranking.premium !== null,
          },
        )}
      >
        <div
          onClick={props.onClick}
          className="cursor-pointer flex flex-col w-full"
        >
          <img
            src={props.ranking.profile_picture || avatar}
            alt={props.ranking.username}
            className="h-64 w-64 rounded-md bg-nv"
            loading="lazy"
          />
          <div className="bg-primary flex flex-col w-full rounded-md mt-3 h-28">
            <div className="flex w-full mt-3 items-center justify-center">
              <p className="text-white text-xl font-bold">
                {props.ranking.username}
              </p>
            </div>
            <div className="flex w-full mt-3 ml-3">
              <p className="text-white text-sm">
                Emblemas resgatados: {props.ranking.qtd}
              </p>
            </div>
            <div className="flex w-full mt-3 ml-3 flex-row items-center gap-2">
              <p className="text-white text-sm">
                Posição: {props.ranking.position}{' '}
              </p>
              {verifyVariationRanking(props.ranking.variation_ranking)}
            </div>
            <div className="flex w-full mt-3 ml-3 flex-row items-center gap-2">
              <p className="text-white text-sm line-clamp-2">
                {props.ranking.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
