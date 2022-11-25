import { BiFilterAlt } from 'react-icons/bi';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';

export function Filter() {
  const { filter, podcast, setFilter, setPodcast } = useBadges();

  return (
    <>
      <div className="w-full mt-4 justify-start gap-2 items-center flex flex-col md:flex-row md:w-[900px] md:mt-6 md:h-20">
        <button
          className="bg-primary gap-1 text-white w-72 h-12 flex items-center justify-center rounded-md md:w-60 hover:bg-nv "
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
            <label className="flex font-bold p-3 cursor-pointer text-sm">
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

          <button
            type="button"
            className="flex bg-primary h-10 items-center justify-center rounded-md hover:bg-nv"
            onClick={() => {
              setFilter(!filter);
              window.location.reload();
            }}
          >
            Limpar filtro
          </button>
        </div>
      )}
    </>
  );
}
