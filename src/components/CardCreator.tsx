import { BiLinkExternal } from 'react-icons/bi';

import { Creator } from 'types/BadgesProps';

import { formatMillions } from 'utils/formatMillion';

interface CardCreatorProps {
  creator: Creator;
}

export function CardCreator(props: CardCreatorProps) {
  return (
    <div key={props.creator.name} className="flex flex-col">
      <div className="bg-primary w-72 h-[480px] flex flex-col items-center justify-center rounded-md mb-3 overflow-hidden p-3">
        <div className="cursor-pointer flex flex-col w-full">
          <img
            src={props.creator.icon}
            alt={props.creator.name}
            className="h-64 w-64 rounded-md"
            loading="lazy"
          />
          <div className="bg-primary  flex flex-col w-full rounded-t-md mt-3">
            <div className="flex w-full mt-3 items-center justify-center font-bold">
              <p className="text-white text-lg">{props.creator.label}</p>
            </div>
            <div className="flex w-full mt-3 items-center justify-center">
              <p className="text-slate-400 text-md">
                {formatMillions(props.creator.subscribers)} inscritos
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center w-full bg-primary h-24 rounded-b-md">
          <a
            className="flex w-full h-12 border-nv border mt-3 rounded-md text-sm flex-row items-center justify-evenly cursor-pointer text-white hover:text-opacity-5 transition-all"
            href={`https://nv99.com.br/${props.creator.name}`}
            target="_blank"
            rel="noreferrer"
          >
            <BiLinkExternal />
            <p className="text-ellipsis overflow-hidden ...">Visitar o canal</p>
          </a>
        </div>
      </div>
    </div>
  );
}
