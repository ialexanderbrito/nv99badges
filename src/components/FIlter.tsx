import { BiFilterAlt, BiSearch } from 'react-icons/bi';

import { Pulsar } from '@uiball/loaders';

import { podcastNames } from 'utils/verifyPodcast';

import { useBadges } from 'contexts/Badges';

export function Filter() {
  const {
    filter,
    podcast,
    setFilter,
    setPodcast,
    username,
    setUsername,
    searchUsername,
    isLoadingPage,
  } = useBadges();

  return (
    <>
      <div className="w-full mt-4 justify-evenly gap-2 items-center flex flex-col h-40 md:flex-row md:w-[900px] md:mt-6 md:h-20">
        <button
          className="bg-primary gap-1 text-white w-96 h-16 flex items-center justify-center rounded-md md:w-60 hover:bg-nv "
          onClick={() => {
            setFilter(!filter);
          }}
        >
          <BiFilterAlt />
          Filtrar por podcast
        </button>

        <div className="flex items-center w-full justify-center gap-2">
          <input
            type="text"
            placeholder="Pesquisar por usuário"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                searchUsername();
              }
            }}
            className="bg-primary text-white h-16 w-80 rounded-md px-4 outline-none focus:border hover:border border-nv sm:w-80 md:w-full"
          />

          <button
            type="button"
            className="bg-nv text-white w-16 h-14 flex items-center justify-center rounded-md md:w-16"
            onClick={() => {
              searchUsername();
            }}
          >
            {isLoadingPage ? (
              <Pulsar color="#FFF" size={24} />
            ) : (
              <BiSearch size={24} />
            )}
          </button>
        </div>
      </div>

      {filter && (
        <div className="text-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {podcastNames.map((pdc) => (
            <label className="flex font-bold p-3 cursor-pointer">
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
            className="flex bg-primary h-12 items-center justify-center rounded-md hover:bg-nv"
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
