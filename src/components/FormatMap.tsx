'use client';

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { cn } from '@/lib/utils';

// Тексты приходят уже пропущенными через типограф: в клиентских компонентах его не импортируем
export interface Stage {
  number: string;
  title: string;
  description: string;
}

interface FormatMapProps {
  stages: Stage[];
  prompt: string;
  axes: { top: string; bottom: string; left: string; right: string };
  cta: string;
  fits: string;
  markerLabel: string;
}

type Quadrant = 'tl' | 'tr' | 'bl' | 'br';

// Какие форматы подходят в каждой четверти и какой формат подставить в письмо (LetterComposer).
// Вверху — неясно, что мешает, справа — решений много
const QUADRANTS: Record<Quadrant, { stages: number[]; letter: number; label: string; position: string }> = {
  bl: { stages: [0], letter: 0, label: 'I', position: 'left-0 bottom-0' },
  tl: { stages: [1], letter: 1, label: 'II', position: 'left-0 top-0' },
  br: { stages: [2], letter: 2, label: 'III', position: 'right-0 bottom-0' },
  tr: { stages: [1, 2], letter: 3, label: 'II → III', position: 'right-0 top-0' },
};

const clamp = (value: number) => Math.min(0.96, Math.max(0.04, value));

/**
 * Карта «Где вы сейчас»: две оси из описаний форматов — одно решение или серия,
 * ясно или нет, что мешает. Посетитель ставит точку, подходящие форматы справа
 * подсвечиваются, кнопка ведёт в письмо с уже выбранным форматом.
 *
 * Пока точку не ставили, все три формата выглядят одинаково: без JS раздел читается как раньше.
 */
export default function FormatMap({ stages, prompt, axes, cta, fits, markerLabel }: FormatMapProps) {
  const planeRef = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState({ x: 0.5, y: 0.5 });
  const [quadrant, setQuadrant] = useState<Quadrant | null>(null);
  const [dragging, setDragging] = useState(false);
  const tapStart = useRef<{ x: number; y: number } | null>(null);

  const place = (x: number, y: number) => {
    const next = { x: clamp(x), y: clamp(y) };
    setPoint(next);
    setQuadrant(`${next.y < 0.5 ? 't' : 'b'}${next.x < 0.5 ? 'l' : 'r'}` as Quadrant);
  };

  const placeFromEvent = (event: PointerEvent) => {
    const rect = planeRef.current?.getBoundingClientRect();
    if (!rect) return;
    place((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
  };

  // Точку тянут за саму точку. По остальной карте — только тап: протяжка пальцем
  // остаётся прокруткой страницы, иначе на телефоне квадрат во всю ширину её бы блокировал
  const onMarkerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus({ preventScroll: true });
    setDragging(true);
  };
  const onMarkerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragging) placeFromEvent(event);
  };
  const onMarkerUp = () => setDragging(false);

  const onPlaneDown = (event: PointerEvent<HTMLDivElement>) => {
    // Нажатие на саму точку обрабатывает onMarkerDown
    if (!(event.target instanceof HTMLButtonElement)) tapStart.current = { x: event.clientX, y: event.clientY };
  };
  const onPlaneUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = tapStart.current;
    tapStart.current = null;
    if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) < 10) placeFromEvent(event);
  };

  const onMarkerKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 0.1 : 0.05;
    const delta = ({ ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] } as Record<string, number[]>)[event.key];
    if (!delta) return;
    event.preventDefault();
    place(point.x + delta[0], point.y + delta[1]);
  };

  const active = quadrant ? QUADRANTS[quadrant].stages : null;
  const chosen = active ? active.map((i) => stages[i].title).join(' + ') : '';

  const chooseInLetter = () => {
    if (quadrant) window.dispatchEvent(new CustomEvent('letter:format', { detail: QUADRANTS[quadrant].letter }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] gap-10 md:gap-12 items-start">

      <div className="reveal w-full max-w-[400px]">
        <p className="text-sm text-muted mb-4">{prompt}</p>
        <div
          ref={planeRef}
          onPointerDown={onPlaneDown}
          onPointerUp={onPlaneUp}
          onPointerCancel={() => { tapStart.current = null; }}
          className={cn('format-plane relative aspect-square border border-rule select-none cursor-pointer touch-pan-y', dragging && 'is-dragging')}
        >
          {(Object.keys(QUADRANTS) as Quadrant[]).map((key) => (
            <div
              key={key}
              aria-hidden="true"
              className={cn(
                'absolute w-1/2 h-1/2 grid place-items-center transition-colors duration-500',
                QUADRANTS[key].position,
                quadrant === key && 'bg-accent/[0.07]',
              )}
            >
              <span className={cn('font-serif italic text-2xl transition-colors duration-500', quadrant === key ? 'text-accent' : 'text-muted/50')}>
                {QUADRANTS[key].label}
              </span>
            </div>
          ))}

          {/* Оси: подписи у концов, внутри квадрата — снаружи на узком экране не помещались */}
          <span aria-hidden="true" className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/25" />
          <span aria-hidden="true" className="absolute top-1/2 left-0 right-0 h-px bg-ink/25" />
          <span aria-hidden="true" className="absolute left-[calc(50%+8px)] top-2 text-[11px] leading-tight text-muted">↑ {axes.top}</span>
          <span aria-hidden="true" className="absolute left-[calc(50%+8px)] bottom-2 text-[11px] leading-tight text-muted">↓ {axes.bottom}</span>
          <span aria-hidden="true" className="absolute left-2 bottom-[calc(50%+6px)] text-[11px] leading-tight text-muted">← {axes.left}</span>
          <span aria-hidden="true" className="absolute right-2 bottom-[calc(50%+6px)] text-[11px] leading-tight text-muted text-right">{axes.right} →</span>

          <button
            type="button"
            aria-label={markerLabel}
            aria-describedby="format-map-result"
            onPointerDown={onMarkerDown}
            onPointerMove={onMarkerMove}
            onPointerUp={onMarkerUp}
            onPointerCancel={onMarkerUp}
            onKeyDown={onMarkerKey}
            className={cn('format-marker', quadrant && 'is-picked')}
            style={{ left: `${(point.x * 100).toFixed(2)}%`, top: `${(point.y * 100).toFixed(2)}%` }}
          />
        </div>

        <p id="format-map-result" className="sr-only" aria-live="polite">{chosen && `${fits} ${chosen}`}</p>

        <a
          href="#contact"
          onClick={chooseInLetter}
          aria-hidden={!quadrant}
          tabIndex={quadrant ? undefined : -1}
          className={cn(
            'mt-5 inline-flex items-center gap-2 border-b border-accent/50 pb-1 text-xs uppercase tracking-[0.18em] text-ink transition-[opacity,border-color] duration-500 hover:border-accent whitespace-nowrap',
            quadrant ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        >
          {cta}<span aria-hidden="true">↓</span>
        </a>
      </div>

      <ol className="grid grid-cols-1 gap-y-2 min-w-0">
        {stages.map((stage, index) => {
          const on = active?.includes(index);
          return (
            <li
              key={stage.number}
              className={cn('reveal border-t pt-5 pb-4 min-w-0 transition-colors duration-500', on ? 'border-accent' : 'border-rule')}
            >
              {/* Приглушаем внутренний блок, а не li: у .reveal анимация с fill both
                  держит opacity: 1 и перебила бы класс */}
              <div className={cn('transition-opacity duration-500', active && !on && 'opacity-45')}>
                <span className={cn('block font-serif text-2xl italic mb-2 transition-colors duration-500', on ? 'text-accent' : 'text-muted')}>
                  {stage.number}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mb-2 text-ink break-words hyphens-auto">{stage.title}</h3>
                <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-xl">{stage.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
