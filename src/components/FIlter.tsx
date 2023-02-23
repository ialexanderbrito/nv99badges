import { useBadges } from 'contexts/Badges';

interface FilterProps {
  podcastNames: { creator_profile_id: string; label: string }[];
}

export function Filter({ podcastNames }: FilterProps) {
  const { podcast, setPodcast } = useBadges();

  function handlePodcastChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPodcast(event.target.value);
  }

  return (
    <div className="text-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center mt-4">
      <p className="font-bold underline ml-4">Filtrar por podcast:</p>
      <select
        className="bg-dark text-white rounded p-2 text-sm font-medium"
        value={podcast}
        onChange={handlePodcastChange}
      >
        <option value="">Todos</option>
        {podcastNames.map((podcast) => (
          <option
            key={podcast.creator_profile_id}
            value={podcast.creator_profile_id}
          >
            {podcast.label}
          </option>
        ))}
      </select>
    </div>
  );
}
