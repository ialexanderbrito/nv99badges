import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { BiArrowBack, BiLinkExternal } from 'react-icons/bi';
import Tilt from 'react-parallax-tilt';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Spark } from 'assets/Spark';
import { format } from 'date-fns';
import { Badge as BadgeProps } from 'types/BadgesProps';

import { CardSkeleton } from 'components/CardSkeleton';
import { Header } from 'components/Header';

import { verifyPodcast } from 'utils/verifyPodcast';

import { useToast } from 'contexts/Toast';

import { getBadgeById } from 'services/get/badges';

export function Badge() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { code } = useParams();

  const [badge, setBadge] = useState<BadgeProps>();

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

  function twoDecimals(number: number) {
    if (number % 1 === 0) {
      return number;
    }

    return number.toFixed(2);
  }

  return (
    <>
      <Helmet>
        <title>NV99 Badge | {badge?.code || ''}</title>
      </Helmet>
      <div className="bg-dark w-full items-center flex flex-col">
        <Header />

        <div className="flex px-6 w-full items-center text-white mt-16 cursor-pointer md:px-10">
          <BiArrowBack size={32} onClick={() => navigate(-1)} />
        </div>

        {isLoading || !badge ? (
          <div className="mt-16 flex flex-col">
            <CardSkeleton />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="#ffffff"
              glarePosition="all"
              glareBorderRadius="20px"
              className=" items-center justify-center flex mt-12 "
              perspective={2000}
            >
              <div className="flex h-[600px] w-96 bg-primary border border-nv  flex-col items-center justify-around rounded-md z-0">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-white text-2xl font-bold">
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
                    className="h-16 w-16 rounded-full ml-2 z-10 absolute top-14 right-2 border border-nv"
                  />
                )}
                <img
                  src={badge?.high}
                  alt={badge?.code}
                  className="h-80 w-80 rounded-md bg-nv"
                />
                <div className="w-80 p-2 text-white rounded-md">
                  <p className="flex gap-2 items-center">
                    Valor de mercado:
                    <Spark />
                    <span className="font-bold text-nv">
                      {twoDecimals(badge?.market_value || 0)}
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
              className="bg-primary mt-6 text-white w-80 h-16 flex items-center justify-center gap-4 rounded-md md:w-96 hover:bg-nv transition-all"
              href={`https://nv99.com.br/badge/${badge?.code}`}
              target="_blank"
              rel="noreferrer"
            >
              <BiLinkExternal />
              Ir para o mercado
            </a>
          </div>
        )}
      </div>
    </>
  );
}
