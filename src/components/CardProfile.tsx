import cx from 'classnames';
import { Profile } from 'types/BadgesProps';

interface CardProfileProps {
  profile: Profile[];
  username: string;
}

export function CardProfile({ profile, username }: CardProfileProps) {
  return (
    <div className="select-none font-bold text-white mt-12 mb-4 flex justify-between px-5 items-center w-full bg-primary overflow-hidden h-60 md:h-28 md:rounded-lg md:mt-20">
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
  );
}
