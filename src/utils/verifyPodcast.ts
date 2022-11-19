export const podcastNames = [
  {
    name: 'VenusPodcast',
    id: 'mL0SV0pP2YtOeXxjWe2P',
  },
  {
    name: 'Flow',
    id: '25x0SqMaSNXgwv14g0Xg',
  },
  {
    name: 'Flow Sport Club',
    id: 'XzHIWZr50PSQJ6i47kVd',
  },
  {
    name: 'Ciência Sem Fim',
    id: 'yLTB8ibDV92MmwQMNHQD',
  },
  {
    name: 'Kritikê Podcast',
    id: 'ac7TKXX0pZ928KiXFzrL',
  },
  {
    name: 'Flow Games',
    id: '2mXVl9k4sEbrBKrvwDtL',
  },
  {
    name: 'Rene e Jotas',
    id: 'P2SEdHsEtEBF4QSglVdv',
  },
  {
    name: 'Toca do Elfo',
    id: 'elxu2TNruyiJGBIL56el',
  },
  {
    name: 'Prosa Guiada',
    id: 'Wr8kAod7FUvG4vF8Z1es',
  },
  {
    name: 'Estúdios Flow',
    id: '2QfGAsD7OzgO4TKMg2Hb',
  },
  {
    name: 'NV99',
    id: 'lnB5tRq9MI5bfPGDOIie',
  },
  {
    name: 'Noir Podcast',
    id: 'yRIU2ONnLFuaAIA9qQT4',
  },
  {
    name: 'Warriors GH',
    id: 'RagbjuOaIGgBjnt1470Y',
  },
  {
    name: 'NV99 - Devs',
    id: 'qCvZkm48UzemFtNM1Lh4',
  },
  {
    name: 'Nerd Sobre Rodas',
    id: 'gunlRsDWsJqbk6yp1eNG',
  },
  {
    name: 'Tonelive',
    id: 'teHRVwzvqpzzLYfTDPK1',
  },
];

export function verifyPodcast(podcast: string) {
  const podcastName = podcastNames.find(
    (podcastName) => podcastName.id === podcast,
  );
  return podcastName ? podcastName.name : 'Podcast não encontrado';
}
