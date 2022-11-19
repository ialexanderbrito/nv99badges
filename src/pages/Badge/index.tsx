import { Helmet } from 'react-helmet';
import { BiLinkExternal } from 'react-icons/bi';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import Tilt from 'react-parallax-tilt';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Spark } from 'assets/Spark';
import { format } from 'date-fns';

import { CardSkeleton } from 'components/CardSkeleton';

import { twoDecimals } from 'utils/twoDecimal';
import { verifyPodcast } from 'utils/verifyPodcast';

import { useToast } from 'contexts/Toast';

import { useFavorites } from 'hooks/Favorites';

import { getBadgeById } from 'services/get/badges';

export function Badge() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { code } = useParams();
  const { addFavorite, removeFavorite, isFavorite, badge, setBadge } =
    useFavorites();

  const { isLoading } = useQuery(
    ['badge', code],
    () => getBadgeById(String(code)),
    {
      onSuccess: (data) => {
        setBadge(data.data);
      },
      onError: () => {
        toast.error('Badge not found');
        navigate(`/badges/${code}`);
      },
      staleTime: 0,
    },
  );

  return (
    <>
      <Helmet>
        <title>NV99 Badge | {badge?.code || ''}</title>
      </Helmet>
      {isLoading || !badge ? (
        <div className="mt-16 flex flex-col h-[calc(100vh-13.5rem)]">
          <CardSkeleton />
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-9rem)]">
          <div className="flex flex-col items-center">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="#ffffff"
              glarePosition="all"
              glareBorderRadius="20px"
              className=" items-center justify-center flex mt-12"
              perspective={2000}
            >
              <div className="flex h-[650px] w-80 bg-primary border border-nv flex-col items-center justify-evenly rounded-md z-0 md:w-96 sm:w-96">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-white text-md font-bold">
                    {badge?.code}
                  </h1>
                  <span className="text-white font-thin text-sm">
                    {badge?.name}
                  </span>
                </div>
                {badge?.creator_profile?.icon && (
                  <img
                    src={badge?.creator_profile?.icon}
                    alt={badge?.creator_profile?.name}
                    className="h-12 w-12 rounded-full ml-2 z-10 absolute top-20 right-2 border border-nv  sm:right-6 sm:w-16 sm:h-16 sm:top-16"
                  />
                )}
                <img
                  src={badge?.high}
                  alt={badge?.code}
                  className="h-72 w-72 rounded-md bg-nv"
                />
                <div className="w-80 p-2 text-white rounded-md">
                  <p className="flex gap-2 items-center">
                    Valor médio :
                    <Spark />
                    <span className="font-bold text-nv">
                      {twoDecimals(badge?.media_price_badge || 0)}
                    </span>
                  </p>
                  <p>Resgatados: {badge?.count}</p>
                  <p>
                    Criado em:
                    {badge?.created_at
                      ? format(new Date(badge?.created_at), 'dd/MM/yyyy')
                      : ''}
                  </p>
                  <p className="flex flex-row items-center">
                    Por: {verifyPodcast(String(badge?.creator_profile_id))}
                  </p>
                </div>

                <div className="w-80 p-2 text-white rounded-md">
                  {badge?.description && <>"{badge?.description}"</>}
                </div>
              </div>
            </Tilt>

            <a
              className="bg-primary mt-6 text-white w-80 h-16 flex items-center justify-center gap-4 rounded-md md:w-96 hover:bg-nv transition-all sm:w-96"
              href={`https://nv99.com.br/badge/${badge?.code}`}
              target="_blank"
              rel="noreferrer"
            >
              <BiLinkExternal />
              Ir para o mercado
            </a>

            <button
              className="bg-primary mt-6 text-white w-80 h-16 flex items-center justify-center gap-4 rounded-md md:w-96 hover:bg-nv transition-all sm:w-96"
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
      )}
    </>
  );
}
