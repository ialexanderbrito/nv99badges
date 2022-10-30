import cx from 'classnames';

import { useBadges } from 'contexts/Badges';

export function Menu() {
  const {
    searchBadge,
    setSearchBadge,
    pathname,
    handleSelectedMaisRaros,
    handleSelectedMaisResgatados,
    handleSelectedMaisRecentes,
  } = useBadges();

  return (
    <div className="w-full justify-around mt-16 items-center flex flex-col  h-72 md:flex-row md:w-[900px] md:mt-0 md:h-48">
      <button
        type="button"
        className={cx(
          'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
          {
            'text-nv border border-nv':
              pathname === '/mais-raros' || pathname === '/',
          },
        )}
        onClick={() => handleSelectedMaisRaros()}
      >
        Mais Raros
      </button>
      <button
        type="button"
        className={cx(
          'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
          {
            'text-nv  border border-nv': pathname === '/mais-resgatados',
          },
        )}
        onClick={() => handleSelectedMaisResgatados()}
      >
        Mais Resgatados
      </button>
      <button
        type="button"
        className={cx(
          'bg-primary text-white w-80 h-16 flex items-center justify-center rounded-md md:w-40',
          {
            'text-nv  border border-nv': pathname === '/mais-recentes',
          },
        )}
        onClick={() => handleSelectedMaisRecentes()}
      >
        Mais Recentes
      </button>

      <input
        type="text"
        placeholder="Pesquisar"
        value={searchBadge}
        onChange={(e) => {
          setSearchBadge(e.target.value);
        }}
        className="bg-primary text-white h-16 w-80 rounded-md px-4 outline-none  focus:border hover:border border-nv sm:w-80"
      />
    </div>
  );
}
