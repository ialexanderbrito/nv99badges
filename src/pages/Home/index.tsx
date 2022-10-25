import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { Card } from 'components/Card';
import { CardSkeleton } from 'components/CardSkeleton';
import { Header } from 'components/Header';
import { TopCard } from 'components/TopCard';

import { useToast } from 'contexts/Toast';

import { getBadges } from 'services/get/badges';

export function Homepage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchBadge, setSearchBadge] = useState('');
  const [badgesFiltered, setBadgesFiltered] = useState<Badge[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [selectButton, setSelectButton] = useState('mais-raros');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function badges() {
      try {
        setLoading(true);
        const { data } = await getBadges();

        setBadges(data.badges);

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar badges', {
          id: 'error',
        });
      } finally {
        setLoading(false);
      }
    }

    badges();
  }, [toast]);

  function searchBadgesByCode(code: string) {
    const badgesFiltered = badges.filter(
      (badge) =>
        badge.code.toLowerCase().includes(code.toLowerCase()) ||
        badge.name.toLowerCase().includes(code.toLowerCase()) ||
        badge.description.toLowerCase().includes(code.toLowerCase()),
    );

    setBadgesFiltered(badgesFiltered);

    if (code === '') {
      setBadgesFiltered(badges);
    }
  }

  function handleSelectedMaisRaros() {
    setSelectButton('mais-raros');

    const badgesFiltered = badges.sort((a, b) => a.count - b.count);

    setBadges(badgesFiltered);
  }

  function handleSelectedMaisResgatados() {
    setSelectButton('mais-resgatados');
    const badgesFiltered = badges.sort((a, b) => b.count - a.count);

    setBadges(badgesFiltered);
  }

  function handleSelectedMaisRecentes() {
    setSelectButton('mais-recentes');
    const badgesFiltered = badges.sort(
      (a, b) => new Date(b.expires_at) - new Date(a.expires_at),
    );

    setBadges(badgesFiltered);
  }

  return (
    <>
      <div className="bg-dark w-full items-center flex flex-col">
        <Header />

        <div className="w-[900px] h-20 flex items-center justify-evenly mt-16">
          <button
            type="button"
            className={cx(
              'bg-primary text-white w-40 h-16 flex items-center justify-center rounded-md',
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
              'bg-primary text-white w-40 h-16 flex items-center justify-center rounded-md',
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
              'bg-primary text-white w-40 h-16 flex items-center justify-center rounded-md',
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
              searchBadgesByCode(e.target.value);
            }}
            className="bg-primary text-white h-16 w-80 rounded-md px-4 outline-none  focus:border hover:border border-nv"
          />
        </div>

        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <>
                <div className="grid grid-cols-3 gap-4">
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
                <div className="grid grid-cols-3 gap-4">
                  {badges
                    .sort((a, b) => a.count - b.count)
                    .slice(0, 3)
                    .map((badge, index) => (
                      <TopCard
                        key={index}
                        badge={badge}
                        index={index}
                        onClick={() => navigate(`/badge/${badge.code}`)}
                      />
                    ))}
                </div>

                <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                  Todos os emblemas
                </h1>
                <div className="grid grid-cols-3 gap-4">
                  {badges
                    .sort((a, b) => a.count - b.count)
                    .slice(3)
                    .map((badge) => (
                      <Card
                        badge={badge}
                        key={badge.badge_id}
                        onClick={() => navigate(`/badge/${badge.code}`)}
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
                  <div className="grid grid-cols-3 gap-4">
                    {badges
                      .sort((a, b) => b.count - a.count)
                      .map((badge) => (
                        <Card
                          badge={badge}
                          key={badge.badge_id}
                          onClick={() => navigate(`/badge/${badge.code}`)}
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
                <div className="grid grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <Card
                      badge={badge}
                      key={badge.badge_id}
                      onClick={() => navigate(`/badge/${badge.code}`)}
                    />
                  ))}
                </div>
              </>
            )}

            {badgesFiltered.length === 0 && searchBadge !== '' && (
              <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                Nenhum resultado encontrado para "{searchBadge}"
              </h1>
            )}

            {badgesFiltered.length > 0 && searchBadge !== '' && (
              <>
                <h1 className="text-white text-2xl font-bold mt-4 mb-4">
                  Resultados para "{searchBadge}"
                </h1>

                <div className="grid grid-cols-3 gap-4">
                  {badgesFiltered.map((badge) => (
                    <Card
                      badge={badge}
                      key={badge.badge_id}
                      onClick={() => navigate(`/badge/${badge.code}`)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
