import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Pulsar } from '@uiball/loaders';
import cx from 'classnames';
import { Result } from 'types/UserProps';

import { NotFound } from 'pages/NotFound';

import { CardProfile } from 'components/CardProfile';
import { DropdownMenu } from 'components/Menu';
import { Pagination } from 'components/Pagination';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getUser } from 'services/get/badges';

export function User() {
  const { toast } = useToast();
  const { id: username } = useParams();
  const {
    page,
    setPage,
    setTotalBadges,
    filterBadgeUser,
    setFilterBadgeUser,
    isSecret,
    setIsSecret,
    isNormal,
    setIsNormal,
    selectedPodcast,
    setSelectedPodcast,
    totalBadges,
  } = useBadges();

  useEffect(() => {
    setPage(1);

    if (isSecret === false && isNormal === false) {
      setIsSecret(true);
      setIsNormal(true);
    }
  }, [filterBadgeUser, isSecret, isNormal, selectedPodcast]);

  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery(
    ['user', page, filterBadgeUser, isSecret, isNormal, selectedPodcast],
    () =>
      getUser(
        String(username),
        36,
        page,
        filterBadgeUser,
        isNormal,
        isSecret,
        selectedPodcast,
      ),
    {
      onSuccess: (data) => {
        setTotalBadges(data.data.total);
      },
      onError: () => {
        toast.error('Não foram encontrados mais badges', { id: 'toast' });
      },
      cacheTime: 1000 * 60 * 60 * 3,
      enabled: Boolean(username),
    },
  );

  if (isErrorUser) {
    return (
      <NotFound
        title={`Infelizmente o usuário ${username} não foi encontrado ou usuário é privado!`}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>NV99 Badges | {username}</title>
      </Helmet>

      {isLoadingUser ? (
        <div className="flex justify-center items-center h-screen">
          <Pulsar size={32} color="#f8c227" />
        </div>
      ) : (
        <>
          <CardProfile
            profile={userData?.data.profile}
            username={username || ''}
            profileXp={userData?.data.profileXP}
          />

          {userData?.data.results.length === 0 ? (
            <h1 className="text-white text-2xl font-bold mt-4 mb-4 text-center">
              Usuário com perfil privado ou não possui emblemas.
            </h1>
          ) : (
            <>
              <div className=" text-white w-full items-center justify-start gap-4 flex mb-4">
                <DropdownMenu
                  filter={filterBadgeUser}
                  setFilter={setFilterBadgeUser}
                />

                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    className="accent-nv"
                    checked={isNormal}
                    onChange={() => setIsNormal(!isNormal)}
                  />
                  Normais
                </label>
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    className="accent-nv"
                    checked={isSecret}
                    onChange={() => setIsSecret(!isSecret)}
                  />
                  Secretos
                </label>
              </div>

              <div className="text-white w-full items-center justify-start gap-4 flex mb-4">
                <p className="font-bold underline ml-4">Filtrar por podcast:</p>
                <select
                  className="bg-dark text-white rounded p-2 text-sm font-medium"
                  value={selectedPodcast}
                  onChange={(e) => setSelectedPodcast(e.target.value)}
                >
                  <option value="">Todos</option>
                  {podcastNames.map((podcast) => (
                    <option
                      key={podcast.creator_profile_id}
                      value={podcast.creator_profile_id}
                    >
                      {podcast.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {userData?.data.results.map((user: Result) => (
                  <Link
                    to={`/badge/${user.code}`}
                    key={user.code}
                    className={cx(
                      'flex relative gap-2 h-25 md:h-30 w-full bg-primary rounded-none md:rounded cursor-pointer',
                      {
                        'border border-nv': user?.secret,
                      },
                    )}
                  >
                    <div className="flex absolute top-1 left-1 z-10 flex-col gap-1" />
                    <img
                      src={user.high}
                      alt="Avatar"
                      className="w-32 h-32 rounded"
                    />
                    <div className="absolute bg-primary/90 top-0 right-1 p-1 rounded pointer-events-none">
                      <p
                        className={cx('font-bold text-sm italic text-white', {
                          'text-nv': user?.serial_number <= 99,
                        })}
                      >
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
                  </Link>
                ))}
              </div>

              <Pagination
                currentPage={page}
                handlePage={setPage}
                pages={Math.ceil(totalBadges / 36)}
                key={page}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
