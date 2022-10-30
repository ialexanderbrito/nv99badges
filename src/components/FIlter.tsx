import { BiFilterAlt } from 'react-icons/bi';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';

export function Filter() {
  const { filter, podcast, setFilter, setPodcast } = useBadges();

  return (
    <>
      <div className="flex gap-2 w-80 sm:w-3/4 md:w-[900px] ">
        <button
          className="bg-primary gap-4 text-white w-60 h-16 flex items-center justify-center rounded-md mb-6 mt-6 md:w-96 hover:bg-nv "
          onClick={() => {
            setFilter(!filter);
          }}
        >
          <BiFilterAlt />
          Filtrar por podcast
        </button>
      </div>

      {filter && (
        <div className="text-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {podcastNames.map((pdc) => (
            <label className="flex font-bold p-3">
              <input
                type="radio"
                name="podcast"
                value={podcast}
                className="accent-nv mr-2"
                onClick={() => {
                  setPodcast(pdc.id);
                }}
              />
              {pdc.name}
            </label>
          ))}
        </div>
      )}
    </>
  );
}
