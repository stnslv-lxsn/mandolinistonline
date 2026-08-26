import Link from 'next/link';
import { cn } from '@/lib/utils';

export const variants = [
  { id: 'I', href: '/', title: 'Editorial' },
  { id: 'II', href: '/noir', title: 'Ночь' },
  { id: 'III', href: '/studio', title: 'Досье' },
];

interface VariantSwitcherProps {
  current: string;
  /** Тон плашки под фон варианта */
  tone?: 'light' | 'dark';
}

/**
 * Временная плашка для сравнения вариантов дизайна между собой.
 * Перед сдачей сайта её нужно убрать вместе с лишними макетами.
 */
export default function VariantSwitcher({ current, tone = 'light' }: VariantSwitcherProps) {
  return (
    <nav
      aria-label="Варианты дизайна"
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-1 rounded-full px-2 py-1.5 backdrop-blur-md shadow-lg',
        tone === 'dark' ? 'bg-white/10 text-bone' : 'bg-black/80 text-white'
      )}
    >
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={variant.href}
          aria-current={variant.id === current ? 'page' : undefined}
          className={cn(
            'px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.2em] transition-colors',
            variant.id === current ? 'bg-white text-black' : 'hover:bg-white/20'
          )}
        >
          {variant.id}
        </Link>
      ))}
    </nav>
  );
}
