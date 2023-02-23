import { BiLinkExternal } from 'react-icons/bi';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import Tilt from 'react-parallax-tilt';

import { Spark } from 'assets';
import { format } from 'date-fns';
import { Badge } from 'types/BadgesProps';

import { twoDecimals } from 'utils/twoDecimal';
import { verifyPodcast } from 'utils/verifyPodcast';

import { useFavorites } from 'hooks/Favorites';

export function BadgeDetail({ data }: { data: Badge }) {
  const { addFavorite, removeFavorite, isFavorite, badge } = useFavorites();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-16 px-4 w-full max-w-[75.5rem] mt-6">
        <div className="flex items-center justify-center">
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#ffffff"
            glarePosition="all"
            glareBorderRadius="20px"
            className=" items-center justify-center flex"
            perspective={2000}
          >
            <div className="flex h-[650px] w-80 bg-primary border border-nv flex-col items-center justify-evenly rounded-md z-0 md:w-96 sm:w-96">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-white text-md font-bold">{data.code}</h1>
                <span className="text-white font-thin text-sm">
                  {data.name}
                </span>
              </div>
              {data.creator_profile?.icon && (
                <img
                  src={data.creator_profile?.icon}
                  alt={data.creator_profile?.name}
                  className="h-12 w-12 rounded-full ml-2 z-10 absolute top-20 right-2 border border-nv  sm:right-6 sm:w-16 sm:h-16 sm:top-16"
                />
              )}
              <img
                src={data.high}
                alt={data.code}
                className="h-72 w-72 rounded-md bg-nv"
              />
              <div className="w-80 p-2 text-white rounded-md">
                <p className="flex gap-2 items-center">
                  Valor médio :
                  <Spark />
                  <span className="font-bold text-nv">
                    {twoDecimals(data.media_price_badge || 0)}
                  </span>
                </p>
                <p>Resgatados: {data.count}</p>
                <p>
                  Criado em:
                  {data.created_at
                    ? format(new Date(data.created_at), 'dd/MM/yyyy')
                    : ''}
                </p>
                <p className="flex flex-row items-center">
                  Por: {verifyPodcast(String(data.creator_profile_id))}
                </p>
              </div>

              <div className="w-80 p-2 text-white rounded-md">
                {data.description && <>"{data.description}"</>}
              </div>
            </div>
          </Tilt>
        </div>
        <div className="flex flex-col gap-7 w-full text-white justify-center">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-white line-clamp-2 leading-[3rem]">
                {data.name}
              </h1>
              <p className="text-lg font-medium leading-6 text-ui-lightest uppercase">
                {data.code}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 leading-5">
            <p className="text-lg font-semibold text-white">
              Informações gerais:
            </p>

            <div className="flex gap-2 items-center text-white">
              <p className="text-lg font-semibold">
                Valor médio (Total/Resgatados):
              </p>
              <Spark />
              <p className="text-lg leading-5">
                {twoDecimals(data.media_price_badge || 0)} sparks
              </p>
            </div>

            <div className="flex gap-2 items-center text-white">
              <p className="text-lg font-semibold">Criado em:</p>
              <p className="text-lg leading-5">
                {data.created_at
                  ? format(new Date(data.created_at), 'dd/MM/yyyy - HH:mm')
                  : ''}
              </p>
            </div>

            <div className="flex gap-2 items-center text-white">
              <p className="text-lg font-semibold">Encerrado em:</p>
              <p className="text-lg leading-5">
                {data.expires_at
                  ? format(new Date(data.expires_at), 'dd/MM/yyyy - HH:mm')
                  : ''}
              </p>
            </div>

            <div className="flex gap-2 items-center text-white">
              <p className="text-lg font-semibold">Total de resgates:</p>
              <p className="text-lg leading-5">{data.count}</p>
            </div>

            <div className="flex gap-2 items-center text-white">
              <p className="text-lg font-semibold">Criado por:</p>
              <p className="text-lg leading-5">
                {verifyPodcast(String(data.creator_profile_id))}
              </p>
            </div>
          </div>

          <div className="flex justify-evenly flex-col h-48 md:flex-row">
            <a
              className="bg-primary text-white w-80 h-16 flex items-center justify-center gap-4 rounded-md md:w-72 hover:bg-nv transition-all sm:w-72"
              href={`https://nv99.com.br/badge/${data.code}`}
              target="_blank"
              rel="noreferrer"
            >
              <BiLinkExternal />
              Ir para o mercado
            </a>

            <button
              className="bg-primary text-white w-80 h-16 flex items-center justify-center gap-4 rounded-md md:w-72 hover:bg-nv transition-all sm:w-72"
              onClick={() => {
                isFavorite === true
                  ? removeFavorite(badge)
                  : addFavorite(badge);
              }}
            >
              {isFavorite === true ? (
                <>
                  <MdOutlineFavoriteBorder />
                  Remover dos favoritos
                </>
              ) : (
                <>
                  <MdFavorite />
                  Adicionar aos favoritos
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
