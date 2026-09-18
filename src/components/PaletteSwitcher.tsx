'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

type Palette = 'warm' | 'blue' | 'navy';

const options: { value: Palette; label: string }[] = [
  { value: 'warm', label: 'Зелёная' },
  { value: 'blue', label: 'Синяя' },
  { value: 'navy', label: 'Тёмная' },
];

const values = new Set(options.map((option) => option.value));

// Единственный писатель атрибута — сам переключатель, поэтому подписчиков
// оповещаем вручную из choose()
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Palette {
  const attr = document.documentElement.getAttribute('data-palette');
  return attr !== null && values.has(attr as Palette) ? (attr as Palette) : 'warm';
}

function getServerSnapshot(): Palette {
  return 'warm';
}

export default function PaletteSwitcher() {
  // Атрибут уже проставлен синхронным скриптом в layout — читаем его как
  // внешнее хранилище: на сервере всегда «Зелёная», после гидратации — факт
  const palette = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const choose = useCallback((value: Palette) => {
    if (value === 'warm') {
      document.documentElement.removeAttribute('data-palette');
    } else {
      document.documentElement.setAttribute('data-palette', value);
    }
    try {
      localStorage.setItem('palette', value);
    } catch {
      // приватный режим — просто не запоминаем выбор
    }
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <div className="fixed z-50 bottom-4 right-4 md:bottom-6 md:left-6 md:right-auto flex flex-wrap max-w-[calc(100vw-2rem)] items-center bg-paper border border-rule shadow-sm p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => choose(option.value)}
          aria-pressed={palette === option.value}
          className={cn(
            'font-sans text-[11px] uppercase tracking-[0.15em] px-3 py-2 transition-colors',
            palette === option.value ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
