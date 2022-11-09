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
      <div className="w-full mt-12 justify-evenly gap-2 items-center flex flex-col h-72 md:flex-row md:w-[900px] md:mt-20 md:h-20">
        <button
          className="bg-primary gap-1 text-white w-80 h-16 flex items-center justify-center rounded-md md:w-60 hover:bg-nv "
          onClick={() => {
            setFilter(!filter);
          }}
        >
          <BiFilterAlt />
          Filtrar por podcast
        </button>

        <input
          type="text"
          placeholder="Pesquisar por usuário"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="bg-primary text-white h-16 w-80 rounded-md px-4 outline-none focus:border hover:border border-nv sm:w-80 md:w-full"
        />

        <button
          type="button"
          className="bg-nv text-white w-80 h-14 flex items-center justify-center rounded-md md:w-16"
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

          <button
            type="button"
            className="flex bg-primary items-center justify-center rounded-sm hover:border-nv hover:border"
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
