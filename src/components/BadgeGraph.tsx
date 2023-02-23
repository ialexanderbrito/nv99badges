import { Line } from 'react-chartjs-2';

import { useQuery } from '@tanstack/react-query';
import { Pulsar } from '@uiball/loaders';
import { GraphProps } from 'types/BadgesProps';

import { useToast } from 'contexts/Toast';

import { getGraph } from 'services/get/badges';

export function BadgeGraph({ code }: { code: string }) {
  const { toast } = useToast();

  const {
    data: graphData,
    isLoading: isLoadingGraph,
    isError: isErrorGraph,
  } = useQuery(['graph', code], () => getGraph(String(code)), {
    onSuccess: () => {
      toast.success('Gráficos do emblema carregados', {
        id: 'toast',
      });
    },
    onError: () => {
      toast.error('Gráficos do emblema não encontrados');
    },
    cacheTime: 1000 * 60 * 60 * 3,
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
      labels: graphData?.data.labels.map((item: GraphProps) => item),
      datasets: [
        {
          label: 'Preço nos últimos 7 dias',
          data: graphData?.data.dataset.map((item: GraphProps) => item),
          borderColor: '#f8c227',
          backgroundColor: gradientFill,
          fill: true,
          tension: 0.1,
        },
      ],
    };
  }

  if (isErrorGraph) {
    return toast.error('Erro ao carregar gráficos', {
      id: 'toast',
    });
  }

  return (
    <div className="flex items-center justify-center mt-5 flex-col">
      <h1 className="text-white text-3xl font-bold">Histórico de preços</h1>
      <div className="flex max-w-7xl w-full">
        {isLoadingGraph ? (
          <Pulsar size={32} color="#f8c227" />
        ) : (
          <Line data={dataChart} options={optionsChart} />
        )}
      </div>
    </div>
  );
}
