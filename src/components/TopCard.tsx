import { BiCopy } from 'react-icons/bi';

import cx from 'classnames';

import { useToast } from 'contexts/Toast';

interface TopCardProps {
  high: string;
  secret: boolean;
  name: string;
  code: string;
  count: number;
  description: string;
}

interface BadgeCard {
  badge: TopCardProps;
  index: number;
  onClick?: () => void;
}

export function TopCard(props: BadgeCard) {
  const { toast } = useToast();

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);

    toast.success('Código copiado com sucesso!');
  }

  return (
    <div className="flex flex-col">
      <div
        className={cx(
          'bg-primary w-72 h-[480px] flex flex-col items-center justify-center rounded-md mb-3 overflow-hidden p-3 cursor-pointer',
          {
            'bg-gold': props.index === 0,
            'bg-silver': props.index === 1,
            'bg-bronze': props.index === 2,
            'border border-nv': props.badge.secret,
          },
        )}
        onClick={props.onClick}
      >
        <img
          src={props.badge.high}
          alt={props.badge.name}
          className="h-64 w-64 rounded-md bg-nv"
          loading="lazy"
        />
        <div className="bg-primary w-full rounded-md mt-3">
          <div className="flex w-full mt-3 ml-3">
            <p className="text-white text-sm">Nome: {props.badge.name}</p>
          </div>
          <div className="flex  w-full mt-3 ml-3">
            <p className="text-white text-sm">Resgates: {props.badge.count}</p>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex w-56 h-12 border-nv border mt-3 rounded-md text-sm flex-row items-center justify-evenly cursor-pointer text-white hover:text-opacity-5 transition-all"
              onClick={() => {
                copyToClipboard(props.badge.code);
              }}
            >
              <BiCopy />
              <p className="text-ellipsis overflow-hidden ...">
                {props.badge.code}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center p-3 text-sm text-center text-white">
            {props.badge.description}
          </div>
        </div>
      </div>
    </div>
  );
}
