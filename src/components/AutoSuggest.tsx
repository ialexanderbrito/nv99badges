import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Pulsar } from '@uiball/loaders';
import { avatar } from 'assets';
import { Badge, Studio, User } from 'types/AutoSuggestProps';

import { useToast } from 'contexts/Toast';

import { getSearch } from 'services/get/badges';

export function AutoSuggest() {
  const { toast } = useToast();
  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestionBadges, setSuggestionBadges] = useState<Badge[]>([]);
  const [suggestionStudios, setSuggestionStudios] = useState<Studio[]>([]);
  const [suggestionUsers, setSuggestionUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getSuggestions() {
    try {
      setIsLoading(true);
      const { data } = await getSearch(inputValue);

      setSuggestionBadges(data.badges);
      setSuggestionStudios(data.studios);
      setSuggestionUsers(data.users);

      setIsLoading(false);
    } catch (error) {
      toast.error('Não foi possível obter sugestões', { id: 'toast' });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestions();
    }
  }, [inputValue]);

  return (
    <div>
      <input
        className="bg-primary text-white h-10 w-60 md:w-64 rounded-md px-4 outline-none focus:border border-nv sm:w-96"
        placeholder="Faça uma busca"
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          if (!isHovered) {
            setIsFocus(false);
          }
        }}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      {isFocus && (
        <div
          className="shadow-lg absolute w-full flex bg-primary flex-col"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          {isLoading && (
            <div className="flex items-center justify-center h-20">
              <Pulsar color="#f8c227" size={24} />
            </div>
          )}

          {suggestionUsers.length > 0 && !isLoading && (
            <>
              <div className="text-sm font-bold mt-6 ml-4 leading-3 text-slate-400 uppercase pointer-events-none pb-2">
                Usuários
              </div>
              <div className="flex flex-row overflow-x-auto invisibleScroll gap-3 ml-4 scrollbar-thin scrollbar-thumb-dark scrollbar-track-primary h-32 overflow-y-scroll">
                {suggestionUsers.map((suggestion) => (
                  <>
                    <div
                      className="w-full hover:bg-primary/100 rounded p-1"
                      onClick={() => {
                        setIsFocus(false);
                        setInputValue('');
                        window.location.reload();
                      }}
                    >
                      <Link to={`user/${suggestion.username}`}>
                        <div className="flex flex-col gap-2 justify-center items-center h-full text-white cursor-pointer select-none w-[4.25rem]">
                          <div className="flex relative w-[4.25rem] aspect-square">
                            {suggestion.profile_picture === null ? (
                              <img
                                src={avatar}
                                alt={suggestion.username}
                                className="rounded-full"
                              />
                            ) : (
                              <img
                                src={suggestion.profile_picture}
                                alt={suggestion.username}
                                className="rounded-full"
                              />
                            )}
                          </div>
                          <div className="w-full">
                            <p className="w-full text-sm leading-4.5 text-center line-clamp-1">
                              {suggestion.username}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}

          {suggestionBadges.length > 0 && !isLoading && (
            <>
              <div className="text-sm font-bold mt-2 ml-4 leading-3 text-slate-400 uppercase pointer-events-none pb-2">
                Emblemas
              </div>
              <div className="flex flex-row overflow-x-auto invisibleScroll gap-3 ml-4 scrollbar-thin scrollbar-thumb-dark scrollbar-track-primary h-32 overflow-y-scroll">
                {suggestionBadges.map((suggestion) => (
                  <>
                    <div
                      className="w-full hover:bg-primary/100 rounded p-1"
                      onClick={() => {
                        setIsFocus(false);
                        setInputValue('');
                        window.location.reload();
                      }}
                    >
                      <Link to={`badge/${suggestion.code}`}>
                        <div className="flex flex-col gap-2 justify-center items-center h-full text-white cursor-pointer select-none w-[4.25rem]">
                          <div className="flex relative w-[4.25rem] aspect-square">
                            <img
                              src={suggestion.src}
                              alt={suggestion.name}
                              className="rounded"
                            />
                          </div>
                          <div className="w-full">
                            <p className="w-full text-sm leading-4.5 text-center line-clamp-1">
                              {suggestion.code}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}

          {suggestionStudios.length > 0 && !isLoading && (
            <>
              <div className="text-sm font-bold mt-6 ml-4 leading-3 text-slate-400 uppercase pointer-events-none pb-2">
                Canais
              </div>
              <div className="flex flex-row overflow-x-auto invisibleScroll gap-3 ml-4 scrollbar-thin scrollbar-thumb-dark scrollbar-track-primary h-32 overflow-y-scroll">
                {suggestionStudios.map((suggestion) => (
                  <>
                    <div
                      className="w-full hover:bg-primary/100 rounded p-1"
                      onClick={() => {
                        setIsFocus(false);
                        setInputValue('');
                      }}
                    >
                      <a
                        href={`https://nv99.com.br/${suggestion.name}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="flex flex-col gap-2 justify-center items-center h-full text-white cursor-pointer select-none w-[4.25rem]">
                          <div className="flex relative w-[4.25rem] aspect-square">
                            <img
                              src={suggestion.icon}
                              alt={suggestion.label}
                              className="rounded-full"
                            />
                          </div>
                          <div className="w-full">
                            <p className="w-full text-sm leading-4.5 text-center line-clamp-1">
                              {suggestion.label}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
