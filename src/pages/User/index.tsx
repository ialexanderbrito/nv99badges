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
    isLoadingPage,
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
  }, [page]);

  return (
    <>
      <Helmet>
        <title>NV99 Badges | {username}</title>
      </Helmet>

      {(isLoadingPage || isLoading) && (
        <div className="flex justify-center items-center h-screen">
          <Header />
          <Pulsar size={32} color="#f8c227" />
        </div>
      )}

      <div className="bg-dark w-full items-center flex flex-col">
        <Header />
        <h1 className="text-white text-2xl font-bold mt-20 mb-4">
          {user.length !== 0
            ? `Emblemas de ${username} | ${totalBadges} emblemas resgatados`
            : 'Usuário não encontrado ou perfil privado'}
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {user &&
            user.map((user) => (
              <div
                key={user.id}
                className={cx(
                  'flex relative gap-2 h-25 md:h-30 w-full bg-primary rounded-none md:rounded cursor-pointer',
                  {
                    'border border-nv': user?.secret,
                  },
                )}
              >
                <div className="flex absolute top-1 left-1 z-10 flex-col gap-1"></div>
                <img
                  src={user.high}
                  alt="Avatar"
                  className="w-32 h-32 rounded"
                />
                <div className="absolute bg-primary/90 top-0 right-1 p-1 rounded pointer-events-none">
                  <p className="font-bold text-sm italic text-nv">
                    #{user?.serial_number}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex flex-col flex-1 flex-shrink gap-2 p-3 text-white">
                    <span className="text-md font-semibold text-ui-white line-clamp-1 skeletable">
                      {user?.name}
                    </span>
                    <span className="text-sm line-clamp-3">
                      {user?.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {user.length !== 0 && (
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
