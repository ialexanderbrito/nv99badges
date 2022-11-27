import { Fragment } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { Menu, Transition } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface DropdownMenuProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function DropdownMenu({ filter, setFilter }: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left text-white">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border-none bg-dark px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none">
          Ordernar por
          <BiChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-3 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setFilter('lower_serial')}
                  className={classNames(
                    filter === 'lower_serial' ? 'text-nv' : 'text-white',
                    active ? ' text-nv' : 'text-white',
                    'block px-4 py-2 text-sm cursor-pointer',
                  )}
                >
                  Menor número de série
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setFilter('higher_serial')}
                  className={classNames(
                    filter === 'higher_serial' ? 'text-nv' : 'text-white',
                    active ? ' text-nv' : 'text-white',
                    'block px-4 py-2 text-sm cursor-pointer',
                  )}
                >
                  Maior número de série
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setFilter('newest')}
                  className={classNames(
                    filter === 'newest' ? 'text-nv' : 'text-white',
                    active ? 'text-nv' : 'text-white',
                    'block px-4 py-2 text-sm cursor-pointer',
                  )}
                >
                  Mais recentes
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setFilter('older')}
                  className={classNames(
                    filter === 'older' ? 'text-nv' : 'text-white',
                    active ? 'text-nv' : 'text-white',
                    'block px-4 py-2 text-sm cursor-pointer',
                  )}
                >
                  Mais antigos
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setFilter('redeemed_lower')}
                  className={classNames(
                    filter === 'redeemed_lower' ? 'text-nv' : 'text-white',
                    active ? 'text-nv' : 'text-white',
                    'block px-4 py-2 text-sm cursor-pointer',
                  )}
                >
                  Menor número de resgates
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setFilter('redeemed_higher')}
                  className={classNames(
                    filter === 'redeemed_higher' ? 'text-nv' : 'text-white',
                    active ? 'text-nv' : 'text-white',
                    'block px-4 py-2 text-sm cursor-pointer',
                  )}
                >
                  Maior número de resgates
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
