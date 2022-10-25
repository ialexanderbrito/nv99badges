import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { Card } from 'components/Card';
import { CardSkeleton } from 'components/CardSkeleton';
import { Header } from 'components/Header';
import { TopCard } from 'components/TopCard';

import { useToast } from 'contexts/Toast';

import { getBadges, getBadgesSearch } from 'services/get/badges';

export function Homepage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchBadge, setSearchBadge] = useState('');
  const [badgesFiltered, setBadgesFiltered] = useState<Badge[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [selectButton, setSelectButton] = useState('mais-raros');
  const [limit, setLimit] = useState(50);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBadges() {
      if (selectButton === 'mais-raros') {
        setIsLoading(true);
        try {
          const { data } = await getBadges(limit, 1, 'asc');

          setBadges(data.results);
        } catch (error) {
          toast.error('Error loading badges');
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadBadges();

    async function loadBadgesMaisResgates() {
      if (selectButton === 'mais-resgatados') {
        setIsLoading(true);
        try {
          const { data } = await getBadges(limit, 1, 'desc');

          setBadges(data.results);
        } catch (error) {
          toast.error('Error loading badges');
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadBadgesMaisResgates();

    async function loadBadgesMaisRecentes() {
      if (selectButton === 'mais-recentes') {
        setIsLoading(true);

        try {
          const { data } = await getBadges(limit, 1, 'recent');

          setBadges(data.results);
        } catch (error) {
          toast.error('Error loading badges');
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadBadgesMaisRecentes();
  }, [selectButton, limit, toast]);

  useQuery(['search', searchBadge], () => getBadgesSearch(searchBadge), {
    onSuccess: (data) => {
      setBadgesFiltered(data.data);
    },
    onError: () => {
      toast.error('Badges not found');
    },
    staleTime: 100000,
  });

  function loadMoreBadges() {
    setLimit(limit + 50);
  }

  function handleSelectedMaisRaros() {
    setSelectButton('mais-raros');
    navigate('/mais-raros');
  }

  function handleSelectedMaisResgatados() {
    setSelectButton('mais-resgatados');
    navigate('/mais-resgatados');
  }

  function handleSelectedMaisRecentes() {
    setSelectButton('mais-recentes');
    navigate('/mais-recentes');
  }

  return (
    <>
      <Helmet>
        <title>NV99 Badge</title>
      </Helmet>

      <div className="bg-dark w-full items-center flex flex-col">
        <Header />

        <div className="w-full justify-around mt-16 items-center flex flex-col h-72 md:flex-row md:w-[900px] md:mt-0 ">
          <button
            type="button"
            className={cx(
              'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
              {
                'text-nv border border-nv': selectButton === 'mais-raros',
              },
            )}
            onClick={() => handleSelectedMaisRaros()}
          >
            Mais Raros
          </button>
          <button
            type="button"
            className={cx(
              'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
              {
                'text-nv  border border-nv': selectButton === 'mais-resgatados',
              },
            )}
            onClick={() => handleSelectedMaisResgatados()}
          >
            Mais Resgatados
          </button>
          <button
            type="button"
            className={cx(
              'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
              {
                'text-nv  border border-nv': selectButton === 'mais-recentes',
              },
            )}
            onClick={() => handleSelectedMaisRecentes()}
          >
            Mais Recentes
          </button>

          <input
            type="text"
            placeholder="Pesquisar"
            value={searchBadge}
            onChange={(e) => {
              setSearchBadge(e.target.value);
            }}
            className="bg-primary text-white h-16 w-80 rounded-md px-4 outline-none  focus:border hover:border border-nv sm:w-80"
          />
        </div>

        {isLoading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <CardSkeleton key={index} />
                  <CardSkeleton key={index} />
                  <CardSkeleton key={index} />
                </div>
              </>
            ))}
          </>
        ) : (
          <>
            {badges && selectButton === 'mais-raros' && searchBadge === '' && (
              <>
                <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                  🏆 Top 3 🏆
                </h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {badges
                    .sort((a, b) => a.count - b.count)
                    .slice(0, 3)
                    .map((badge, index) => (
                      <TopCard
                        key={index}
                        badge={badge}
                        index={index}
                        onClick={() => {
                          navigate(`/badge/${badge.code}`);
                        }}
                      />
                    ))}
                </div>

                <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                  Todos os emblemas
                </h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {badges
                    .sort((a, b) => a.count - b.count)
                    .slice(3)
                    .map((badge) => (
                      <Card
                        badge={badge}
                        key={badge.badge_id}
                        onClick={() => {
                          navigate(`/badge/${badge.code}`);
                        }}
                      />
                    ))}
                </div>
              </>
            )}

            {badges &&
              selectButton === 'mais-resgatados' &&
              searchBadge === '' && (
                <>
                  <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                    Emblemas mais resgatados
                  </h1>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {badges
                      .sort((a, b) => b.count - a.count)
                      .map((badge) => (
                        <Card
                          badge={badge}
                          key={badge.badge_id}
                          onClick={() => {
                            navigate(`/badge/${badge.code}`);
                          }}
                        />
                      ))}
                  </div>
                </>
              )}

            {badges && selectButton === 'mais-recentes' && searchBadge === '' && (
              <>
                <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                  Emblemas mais recentes
                </h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {badges.map((badge) => (
                    <Card
                      badge={badge}
                      key={badge.badge_id}
                      onClick={() => {
                        navigate(`/badge/${badge.code}`);
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {badgesFiltered?.length === 0 && searchBadge !== '' && (
              <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                Nenhum resultado encontrado para "{searchBadge}"
              </h1>
            )}

            {badgesFiltered?.length > 0 && searchBadge !== '' && (
              <>
                <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                  Resultados para "{searchBadge}"
                </h1>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {badgesFiltered.map((badge) => (
                    <Card
                      badge={badge}
                      key={badge.badge_id}
                      onClick={() => {
                        navigate(`/badge/${badge.code}`);
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              className="bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40 hover:bg-nv"
              onClick={() => {
                loadMoreBadges();
              }}
            >
              Carregar mais
            </button>
          </>
        )}
      </div>
    </>
  );
}
