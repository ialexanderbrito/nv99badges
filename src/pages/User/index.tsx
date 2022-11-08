import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { Pulsar } from '@uiball/loaders';
import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { Header } from 'components/Header';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getTotalBadgesUser, getUser } from 'services/get/badges';

export function User() {
  const { toast } = useToast();
  const { id: username } = useParams();
  const {
    user,
    setUser,
    page,
    loadMoreBadges,
    setIsLoading,
    isLoading,
    totalBadges,
    setTotalBadges,
  } = useBadges();

  useEffect(() => {
    async function loadUser() {
      setIsLoading(true);
      try {
        const { data } = await getUser(String(username), 12, page, 'serial');
        const { data: total } = await getTotalBadgesUser(String(username));

        setTotalBadges(total.count);
        setUser((old: Badge[]) => [...old, ...data.results]);

        setIsLoading(false);
      } catch (error) {
        toast.error('Usuário não encontrado ou pefil privado');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [username, page]);
  return (
    <>
      <Helmet>
        <title>NV99 Badges | {username}</title>
      </Helmet>

      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <Header />
          <Pulsar size={32} color="#f8c227" />
        </div>
      )}

      <div className="bg-dark w-full items-center flex flex-col">
        <Header />
        <h1 className="text-white text-2xl font-bold mt-20 mb-4">
          {totalBadges === 0
            ? 'Este usuário tem o perfil privado na NV99'
            : `Todos os emblemas os ${totalBadges} de ${username}`}
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {user &&
            user.map((user) => (
              <div
                key={user.id}
                className="flex flex-row items-center justify-evenly bg-primary w-80 h-28 rounded sm:w-80 md:w-96"
                onClick={() => {
                  window.open(user.code, '_blank');
                }}
              >
                <img
                  src={user.high}
                  alt="Avatar"
                  className={cx('w-20 h-20 rounded', {
                    'border border-nv': user.secret,
                  })}
                />

                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex w-48 h-12 border-nv border mt-3 rounded-md text-sm flex-row items-center justify-evenly text-white md:w-72">
                    <p className="text-ellipsis overflow-hidden ...">
                      {user?.code}
                    </p>
                  </div>

                  <strong className="text-white">
                    Nº de resgate{' '}
                    <span
                      className={cx('text-white', {
                        'text-nv': user?.serial_number || 0 <= 100,
                      })}
                    >
                      #{user.serial_number}
                    </span>
                  </strong>
                </div>
              </div>
            ))}
        </div>
        {totalBadges !== 0 && (
          <button
            className="bg-primary text-white w-96 h-16 flex items-center justify-center rounded-md mb-6 mt-6 md:w-96 hover:bg-nv"
            onClick={() => {
              loadMoreBadges();
            }}
          >
            {isLoading ? <Pulsar color="#FFF" /> : 'Carregar mais'}
          </button>
        )}
      </div>
    </>
  );
}