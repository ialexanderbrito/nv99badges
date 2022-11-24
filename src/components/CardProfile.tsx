import { BiInfoCircle } from 'react-icons/bi';
import ReactTooltip from 'react-tooltip';

import cx from 'classnames';
import { Profile, ProfileXp } from 'types/BadgesProps';

interface CardProfileProps {
  profile: Profile[];
  username: string;
  profileXp: ProfileXp;
}

export function CardProfile({
  profile,
  username,
  profileXp,
}: CardProfileProps) {
  return (
    <>
      <div className="font-bold text-white mt-12 mb-0 flex justify-between px-5 items-center w-full bg-primary overflow-hidden h-60 md:h-28 md:rounded-lg md:rounded-b-none md:mt-6">
        <div className="flex flex-col md:flex-row gap-5 mt-5 md:mt-0 rounded-lg">
          <div className="flex gap-3 items-center">Emblemas de @{username}</div>
          <div className="hidden md:flex my-3 w-0.5 bg-white" />
          <div className="grid md:flex grid-cols-2 gap-6 py-3">
            {profile.map((item) => (
              <div className="flex flex-col gap-1 pr-1">
                <p className="text-sm font-bold leading-5 text-slate-400 uppercase">
                  {item.label}
                </p>
                <p
                  className={cx('font-semibold leading-6 text-white', {
                    'text-nv': item.value >= '#100',
                  })}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="font-bold text-white mt-0 mb-4 md:rounded-t-none flex justify-between px-5 items-center w-full bg-primary overflow-hidden h-60 md:h-28 md:rounded-lg md:mt-0">
        <div className="flex flex-col md:flex-row gap-5 mt-5 md:mt-0 rounded-lg w-full">
          <div className="grid md:flex grid-cols-2 gap-6 py-3">
            <div className="flex flex-col gap-1 pr-1">
              <p className="text-sm font-bold leading-5 text-slate-400 uppercase">
                Level
              </p>
              <p className="font-semibold leading-6 text-nv">
                {profileXp?.level}
              </p>
            </div>

            <div className="flex flex-col gap-1 pr-1">
              <p className="text-sm font-bold leading-5 text-slate-400 uppercase flex gap-1 items-center">
                XP
                <p data-tip="">
                  <BiInfoCircle />
                </p>
              </p>
              <p className="font-semibold leading-6 text-white">
                {profileXp?.xp} XP
              </p>
            </div>

            <div className="flex flex-col gap-1 pr-1">
              <p className="text-sm font-bold leading-5 text-slate-400 uppercase">
                Progresso
              </p>
              <p className="font-semibold leading-6 text-white">
                {profileXp?.progress}%
              </p>
            </div>

            <div className="flex flex-col gap-1 pr-1">
              <p className="text-sm font-bold leading-5 text-slate-400 uppercase">
                Elo
              </p>
              <p className="font-semibold leading-6 text-white flex gap-2">
                <img
                  src={profileXp?.src}
                  alt={profileXp?.elo}
                  className="w-5"
                />
                {profileXp?.elo}
              </p>
            </div>

            <div className="flex flex-col gap-1 pr-1">
              <p className="text-sm font-bold leading-5 text-slate-400 uppercase">
                Faltam para o próximo level
              </p>
              <p className="font-semibold text-sm leading-6 text-white flex items-center gap-2">
                <div className="h-2 w-60 bg-gray-300 rounded">
                  <div
                    className={
                      profileXp?.progress >= 100
                        ? 'h-2 bg-nv rounded'
                        : 'h-2 bg-nv rounded'
                    }
                    style={{ width: `${profileXp?.progress}%` }}
                  />
                </div>
                {profileXp?.next_xp} XP
              </p>
            </div>
          </div>
        </div>
      </div>

      <ReactTooltip place="top" type="dark" effect="float">
        <span>Emblema normal: 1 ponto</span>
        <br />
        <span>Emblema secreto: 5 pontos</span>
      </ReactTooltip>
    </>
  );
}
