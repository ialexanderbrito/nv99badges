export const podcastNames = [
  {
    id: '25x0SqMaSNXgwv14g0Xg',
    name: 'FLOW',
  },
  {
    id: '2mXVl9k4sEbrBKrvwDtL',
    name: 'Flow Games',
  },
  {
    id: 'ac7TKXX0pZ928KiXFzrL',
    name: 'Kritikê Podcast',
  },
  {
    id: 'mL0SV0pP2YtOeXxjWe2P',
    name: 'VenusPodcast',
  },
  {
    id: 'AOncvOxcxNdbLe0IpMxn',
    name: 'À Deriva',
  },
  {
    id: 'XzHIWZr50PSQJ6i47kVd',
    name: 'Flow Sport Club',
  },
  {
    id: 'Wr8kAod7FUvG4vF8Z1es',
    name: 'Prosa Guiada',
  },
  {
    id: 'yLTB8ibDV92MmwQMNHQD',
    name: 'Ciência Sem Fim',
  },
  {
    id: 'P2SEdHsEtEBF4QSglVdv',
    name: 'Rene e Jotas',
  },
  {
    id: 'elxu2TNruyiJGBIL56el',
    name: 'Toca do Elfo',
  },
  {
    id: 'gunlRsDWsJqbk6yp1eNG',
    name: 'Nerd Sobre Rodas',
  },
  {
    id: 'lnB5tRq9MI5bfPGDOIie',
    name: 'NV99',
  },
  {
    id: 'qCvZkm48UzemFtNM1Lh4',
    name: 'NV99 - Devs',
  },
  {
    id: 'teHRVwzvqpzzLYfTDPK1',
    name: 'Tonelive',
  },
  {
    id: 'yRIU2ONnLFuaAIA9qQT4',
    name: 'Noir Podcast',
  },
];

export function verifyPodcast(podcast: string) {
  const podcastName = podcastNames.find(
    (podcastName) => podcastName.id === podcast,
  );
  return podcastName ? podcastName.name : 'Podcast não encontrado';
}
