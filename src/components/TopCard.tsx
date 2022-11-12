import { BiCopy } from 'react-icons/bi';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { useToast } from 'contexts/Toast';

import { useFavorites } from 'hooks/Favorites';

interface BadgeCard {
  badge: Badge;
  index: number;
  onClick?: () => void;
}

export function TopCard(props: BadgeCard) {
  const { toast } = useToast();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);

    toast.success('Código copiado com sucesso!');
  }

  return (
    <div key={props.index} className="flex flex-col">
      <div
        className={cx(
          'bg-primary w-72 h-[480px] flex flex-col items-center justify-center rounded-md mb-3 overflow-hidden p-3',
          {
            'bg-gold': props.index === 0,
            'bg-silver': props.index === 1,
            'bg-bronze': props.index === 2,
            'border border-nv': props.badge.secret,
          },
        )}
      >
        <div
          onClick={props.onClick}
          className="cursor-pointer flex flex-col w-full"
        >
          <img
            src={props.badge.high}
            alt={props.badge.name}
            className="h-64 w-64 rounded-md bg-nv"
            loading="lazy"
          />
          <div className="bg-primary  flex flex-col w-full rounded-t-md mt-3">
            <div className="flex w-full mt-3 ml-3">
              <p className="text-white text-sm">Nome: {props.badge.name}</p>
            </div>
            <div className="flex w-full mt-3 ml-3">
              <p className="text-white text-sm">
                Resgates: {props.badge.count}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center w-full bg-primary h-24 rounded-b-md">
          <div
            className="flex w-full h-12 border-nv border mt-3 rounded-md text-sm flex-row items-center justify-evenly cursor-pointer text-white hover:text-opacity-5 transition-all"
            onClick={() => {
              copyToClipboard(props.badge.code);
            }}
          >
            <BiCopy />
            <p className="text-ellipsis overflow-hidden ...">
              {props.badge.code}
            </p>
          </div>
          <div
            className="flex w-full h-12 border-nv border mt-3 rounded-md text-sm flex-row items-center justify-evenly cursor-pointer text-white hover:text-opacity-5 transition-all"
            onClick={() => {
              isFavorite === true
                ? removeFavorite(props.badge)
                : addFavorite(props.badge);
            }}
          >
            {isFavorite === true ? (
              <>
                <MdOutlineFavoriteBorder />
                <p className="text-ellipsis overflow-hidden ...">
                  Remover dos favoritos
                </p>
              </>
            ) : (
              <>
                <MdFavorite />
                <p className="text-ellipsis overflow-hidden ...">
                  Adicionar aos favoritos
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
