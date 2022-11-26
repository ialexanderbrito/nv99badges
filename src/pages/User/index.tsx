import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Pulsar } from '@uiball/loaders';
import cx from 'classnames';
import { Badge } from 'types/BadgesProps';

import { NotFound } from 'pages/NotFound';

import { Button } from 'components/Button';
import { CardProfile } from 'components/CardProfile';
import { DropdownMenu } from 'components/Menu';

import { useBadges } from 'contexts/Badges';
import { useToast } from 'contexts/Toast';

import { getUser } from 'services/get/badges';

export function User() {
  const { toast } = useToast();
  const { id: username } = useParams();
  const {
    user,
    setUser,
    page,
    setPage,
    loadMoreBadges,
    setTotalBadges,
    profile,
    setProfile,
    isLoadingPage,
    setIsLoadingPage,
    profileXp,
    setProfileXp,
    filterBadgeUser,
    setFilterBadgeUser,
    isSecret,
    setIsSecret,
    isNormal,
    setIsNormal,
  } = useBadges();

  useEffect(() => {
    setUser([]);
    setPage(1);

    if (isSecret === false && isNormal === false) {
      setIsSecret(true);
      setIsNormal(true);
    }
  }, [filterBadgeUser, isSecret, isNormal]);

  const { isLoading: isLoadingUser, isError } = useQuery(
    ['user', page, filterBadgeUser, isSecret, isNormal],
    () =>
      getUser(String(username), 12, page, filterBadgeUser, isNormal, isSecret),
    {
      onSuccess: (data) => {
        setTotalBadges(data.data.total);

        setUser((old: Badge[]) => [...old, ...data.data.results]);

        setProfile(data.data.profile);

        setProfileXp(data.data.profileXP);

        setIsLoadingPage(false);
      },
      onError: () => {
        setIsLoadingPage(false);

        toast.error('Não foram encontrados mais badges', { id: 'toast' });
      },
      staleTime: 0,
      enabled: Boolean(username),
    },
  );

  return (
    <>
      <Helmet>
        <title>NV99 Badges | {username}</title>
      </Helmet>

      {isError ? (
        <NotFound
          title={`Infelizmente o usuário ${username} não foi encontrado ou usuário é privado!`}
        />
      ) : (
        <>
          {isLoadingPage || user?.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <Pulsar size={32} color="#f8c227" />
            </div>
          ) : (
            <>
              <CardProfile
                profile={profile}
                username={username || ''}
                profileXp={profileXp}
              />

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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {user &&
                  user.map((user) => (
                    <Link
                      to={`/badge/${user.code}`}
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
              {user.length !== 0 && (
                <Button
                  onClick={() => {
                    loadMoreBadges();
                  }}
                >
                  {isLoadingUser ? <Pulsar color="#FFF" /> : 'Carregar mais'}
                </Button>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
