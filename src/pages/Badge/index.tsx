import { Line } from 'react-chartjs-2';
import { Helmet } from 'react-helmet';
import { BiLinkExternal } from 'react-icons/bi';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import Tilt from 'react-parallax-tilt';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Spark } from 'assets/Spark';
import { format } from 'date-fns';

import { BadgeSkeleton } from 'components/BadgeSkeleton';

import { twoDecimals } from 'utils/twoDecimal';
import { verifyPodcast } from 'utils/verifyPodcast';

import { useToast } from 'contexts/Toast';

import { useFavorites } from 'hooks/Favorites';

import { getBadgeById, getGraph } from 'services/get/badges';

export function Badge() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { code } = useParams();
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
    badge,
    setBadge,
    graphResult,
    setGraphResult,
  } = useFavorites();

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

  useQuery(['graph', code], () => getGraph(String(code)), {
    onSuccess: (data) => {
      setGraphResult(data.data);
    },
    onError: () => {
      toast.error('Badge not found');
      navigate(`/badges/${code}`);
    },
    staleTime: 0,
  });

  const optionsChart = {
    elements: {
      line: {
        tension: 0.1,
      },
      point: {
        radius: 2,
      },
    },
  };

  function dataChart(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');

    const gradientFill = ctx?.createLinearGradient(0, 0, 0, 500);
    gradientFill?.addColorStop(0, 'rgb(248, 194, 39)');
    gradientFill?.addColorStop(0.5, 'rgb(248, 194, 39, 0.6)');
    gradientFill?.addColorStop(1, 'rgb(248, 194, 39, 0.2)');

    return {
      labels: graphResult?.labels.map((item) => item),
      datasets: [
        {
          label: 'Preço nos últimos 7 dias',
          data: graphResult?.dataset.map((item) => item),
          borderColor: '#f8c227',
          backgroundColor: gradientFill,
          fill: true,
          tension: 0.1,
        },
      ],
    };
  }

  return (
    <>
      <Helmet>
        <title>NV99 Badge | {badge?.code || ''}</title>
      </Helmet>
      {isLoading || !badge ? (
        <div className="mt-16 flex flex-col h-[calc(100vh-13.5rem)]">
          <BadgeSkeleton />
        </div>
      ) : (
        <div className="w-full">
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
              </div>
              <div className="flex flex-col gap-7 w-full text-white justify-center">
                <div className="flex flex-col gap-3">
                  <div>
                    <h1 className="text-3xl font-semibold text-white line-clamp-2 leading-[3rem]">
                      {badge?.name}
                    </h1>
                    <p className="text-lg font-medium leading-6 text-ui-lightest uppercase">
                      {badge?.code}
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
                      {twoDecimals(badge?.media_price_badge || 0)} sparks
                    </p>
                  </div>

                  <div className="flex gap-2 items-center text-white">
                    <p className="text-lg font-semibold">Criado em:</p>
                    <p className="text-lg leading-5">
                      {badge?.created_at
                        ? format(
                            new Date(badge?.created_at),
                            'dd/MM/yyyy - HH:mm',
                          )
                        : ''}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center text-white">
                    <p className="text-lg font-semibold">Encerrado em:</p>
                    <p className="text-lg leading-5">
                      {badge?.expires_at
                        ? format(
                            new Date(badge?.expires_at),
                            'dd/MM/yyyy - HH:mm',
                          )
                        : ''}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center text-white">
                    <p className="text-lg font-semibold">Total de resgates:</p>
                    <p className="text-lg leading-5">{badge?.count}</p>
                  </div>

                  <div className="flex gap-2 items-center text-white">
                    <p className="text-lg font-semibold">Criado por:</p>
                    <p className="text-lg leading-5">
                      {verifyPodcast(String(badge?.creator_profile_id))}
                    </p>
                  </div>
                </div>

                <div className="flex justify-evenly flex-col h-48 md:flex-row">
                  <a
                    className="bg-primary text-white w-80 h-16 flex items-center justify-center gap-4 rounded-md md:w-72 hover:bg-nv transition-all sm:w-72"
                    href={`https://nv99.com.br/badge/${badge?.code}`}
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
          <div className="flex items-center justify-center mt-5 flex-col">
            <h1 className="text-white text-3xl font-bold">
              Histórico de preços
            </h1>
            <div className="flex max-w-7xl w-full">
              <Line data={dataChart} options={optionsChart} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
