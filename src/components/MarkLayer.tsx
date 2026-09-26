'use client';

import { useEffect, useRef, useState } from 'react';

// Виды пометок. Фразы для них размечает marked() в серверных компонентах
export type MarkKind = 'underline' | 'highlight' | 'circle' | 'strike' | 'box';

interface Stroke {
  d: string;
  width: number;
  color: string;
  opacity: number;
  delay: number;
  duration: number;
}

type Box = { x: number; y: number; r: number; b: number; w: number; h: number };

// Синяя ручка, красный карандаш, жёлтый маркер
const COLOR: Record<MarkKind, string> = {
  underline: 'var(--color-accent)',
  box: 'var(--color-accent)',
  circle: 'var(--color-pencil)',
  strike: 'var(--color-pencil)',
  highlight: 'var(--color-marker)',
};

// Одинаковая «дрожь руки» при каждом расчёте: иначе при ресайзе штрихи бы прыгали
function seeded(seed: number) {
  let s = seed % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
}

const union = (rects: Box[]) =>
  rects.reduce(
    (u, r) => ({ x: Math.min(u.x, r.x), y: Math.min(u.y, r.y), r: Math.max(u.r, r.r), b: Math.max(u.b, r.b), w: 0, h: 0 }),
    { x: Infinity, y: Infinity, r: -Infinity, b: -Infinity, w: 0, h: 0 },
  );

// Сглаженная ломаная: квадратичные кривые через середины отрезков
function smooth(points: [number, number][]) {
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i][0] + points[i + 1][0]) / 2;
    const my = (points[i][1] + points[i + 1][1]) / 2;
    d += ` Q${f(points[i][0])} ${f(points[i][1])} ${f(mx)} ${f(my)}`;
  }
  const last = points[points.length - 1];
  return `${d} L${f(last[0])} ${f(last[1])}`;
}

function strokesFor(kind: MarkKind, rects: Box[], rnd: () => number): Omit<Stroke, 'delay' | 'duration' | 'color'>[] {
  switch (kind) {
    case 'highlight':
      return rects.map((r) => {
        const y = r.y + r.h * 0.6;
        return { d: `M${r.x - 2} ${y + rnd() * 2} Q${r.x + r.w / 2} ${y - 2 + rnd() * 3} ${r.r + 3} ${y + rnd() * 3}`, width: r.h * 0.5, opacity: 0.85 };
      });
    case 'underline':
      return rects.flatMap((r) => {
        const y = r.b - r.h * 0.08;
        return [
          { d: `M${r.x - 3} ${y + 1 + rnd() * 2} C${r.x + r.w * 0.3} ${y - 1 + rnd() * 3} ${r.x + r.w * 0.7} ${y + 3 + rnd() * 3} ${r.r + 5} ${y + rnd() * 2}`, width: 2.2, opacity: 1 },
          { d: `M${r.x + r.w * 0.08} ${y + 6 + rnd() * 2} C${r.x + r.w * 0.4} ${y + 4 + rnd() * 2} ${r.x + r.w * 0.7} ${y + 7 + rnd() * 2} ${r.r - r.w * 0.05} ${y + 5 + rnd() * 2}`, width: 1.6, opacity: 1 },
        ];
      });
    case 'strike':
      return rects.map((r) => {
        const y = r.y + r.h * 0.56;
        return { d: `M${r.x - 4} ${y + 3 + rnd() * 2} Q${r.x + r.w / 2} ${y - 1 + rnd() * 3} ${r.r + 4} ${y - 3 + rnd() * 2}`, width: 2.4, opacity: 1 };
      });
    case 'circle': {
      const u = union(rects);
      const cx = (u.x + u.r) / 2;
      const cy = (u.y + u.b) / 2;
      // Строка по высоте уже включает выносные элементы: запас по вертикали маленький,
      // иначе обводка задевает соседние строки
      const rx = (u.r - u.x) / 2 + 6;
      const ry = (u.b - u.y) / 2 + 1;
      const start = -2.4 + rnd() * 0.4;
      const points: [number, number][] = [];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        // Чуть больше полного оборота и чуть шире к концу: так обводят от руки
        const angle = start + t * Math.PI * 2 * 1.1;
        const k = 1 + rnd() * 0.035 + t * 0.07;
        points.push([cx + Math.cos(angle) * rx * k, cy + Math.sin(angle) * ry * k]);
      }
      return [{ d: smooth(points), width: 2, opacity: 1 }];
    }
    case 'box': {
      const u = union(rects);
      const j = () => rnd() * 3;
      const x0 = u.x - 6, y0 = u.y - 2, x1 = u.r + 6, y1 = u.b + 2;
      return [{
        d: `M${x0 - 3} ${y0 + j()} L${x1 + 4} ${y0 + j()} M${x1 + j()} ${y0 - 4} L${x1 + j()} ${y1 + 4} M${x1 + 4} ${y1 + j()} L${x0 - 4} ${y1 + j()} M${x0 + j()} ${y1 + 3} L${x0 + j()} ${y0 - 4}`,
        width: 1.8,
        opacity: 1,
      }];
    }
  }
}

/**
 * Слой пометок от руки поверх блока текста: подчёркивание, маркер, обводка, зачёркивание.
 * Кладётся последним ребёнком в элемент с position: relative и рисует штрихи вокруг
 * всех [data-mark] внутри него — по реальным строкам, поэтому переносы учитываются.
 *
 * Слой должен лежать внутри того же элемента, что двигает анимация .reveal: тогда
 * штрихи едут вместе с текстом, а не отдельно от него.
 */
export default function MarkLayer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  // idle — ещё не на экране, draw — рисуются, done — нарисованы (пересчёт без анимации)
  const [phase, setPhase] = useState<'idle' | 'draw' | 'done'>('idle');

  useEffect(() => {
    const svg = svgRef.current;
    const root = svg?.parentElement;
    if (!svg || !root) return;

    const measure = () => {
      const origin = svg.getBoundingClientRect();
      const next: Stroke[] = [];
      let delay = 0;
      root.querySelectorAll<HTMLElement>('[data-mark]').forEach((el, index) => {
        const kind = el.dataset.mark as MarkKind;
        if (!(kind in COLOR)) return;
        const rects = [...el.getClientRects()].map((r) => ({
          x: r.left - origin.left, y: r.top - origin.top, r: r.right - origin.left, b: r.bottom - origin.top, w: r.width, h: r.height,
        }));
        const slow = kind === 'circle' || kind === 'box';
        strokesFor(kind, rects, seeded(index * 977 + 131)).forEach((s) => {
          next.push({ ...s, color: COLOR[kind], delay, duration: slow ? 700 : 450 });
          delay += slow ? 420 : 260;
        });
        delay += 120;
      });
      setStrokes(next);
    };

    // Первый замер кадром позже: к этому моменту раскладка страницы уже устоялась
    let frame = requestAnimationFrame(measure);
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    resize.observe(root);
    // После подмены шрифта строки переносятся иначе, а размер блока может не измениться
    document.fonts?.ready.then(measure);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer = 0;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen.disconnect();
        if (reduced) {
          setPhase('done');
          return;
        }
        setPhase('draw');
        // С запасом на самую длинную цепочку штрихов в блоке
        timer = window.setTimeout(() => setPhase('done'), 4000);
      },
      { threshold: 0.6 },
    );
    seen.observe(root);

    return () => {
      resize.disconnect();
      seen.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  const visible = phase !== 'idle';

  return (
    <svg ref={svgRef} aria-hidden="true" focusable="false" className="mark-layer">
      {strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={1}
          strokeWidth={s.width}
          style={{
            stroke: s.color,
            strokeDasharray: '1 1',
            strokeDashoffset: visible ? 0 : 1,
            // До начала штриха путь прозрачен: иначе круглый конец рисует точку в начале пути
            opacity: visible ? s.opacity : 0,
            transition: phase === 'draw'
              ? `stroke-dashoffset ${s.duration}ms cubic-bezier(.6,.1,.3,1) ${s.delay}ms, opacity 0s linear ${s.delay}ms`
              : 'none',
          }}
        />
      ))}
    </svg>
  );
}
