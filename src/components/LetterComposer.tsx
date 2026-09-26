'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

export type LetterSlot = 'role' | 'situation' | 'format' | 'when';

interface LetterComposerProps {
  email: string;
  subject: string;
  /** Текст письма после типографа, с местами {role}, {situation}, {format}, {when}. Перенос строки — абзац */
  template: string;
  options: Record<LetterSlot, string[]>;
  captions: Record<LetterSlot, string>;
  initial: Record<LetterSlot, number>;
  hint: string;
  labels: { open: string; copy: string; copied: string; selected: string };
}

const SLOT = /\{(role|situation|format|when)\}/;

// В тексте письма неразрывные пробелы не нужны, а невидимый U+2060 после дефиса
// почтовые программы иногда показывают квадратиком
const plain = (text: string) => text.replace(/ /g, ' ').replace(/⁠/g, '');

/**
 * Письмо вместо формы: посетитель собирает его из готовых фраз и отправляет из своей почты.
 * Сайт ничего не принимает и не хранит — серверная форма потребовала бы бэкенд
 * и обработку персональных данных.
 *
 * Формат можно выбрать и на карте в «Работе»: FormatMap шлёт событие letter:format.
 */
export default function LetterComposer({ email, subject, template, options, captions, initial, hint, labels }: LetterComposerProps) {
  const [values, setValues] = useState(initial);
  const [open, setOpen] = useState<LetterSlot | null>(null);
  // Счётчик правок: меняет key у подставленной фразы, и она заново проявляется
  const [edits, setEdits] = useState<Record<LetterSlot, number>>({ role: 0, situation: 0, format: 0, when: 0 });
  const [status, setStatus] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const slotRefs = useRef<Partial<Record<LetterSlot, HTMLSpanElement | null>>>({});
  const panelId = useId();

  const choose = (slot: LetterSlot, index: number) => {
    setValues((current) => ({ ...current, [slot]: index }));
    setEdits((current) => ({ ...current, [slot]: current[slot] + 1 }));
    setStatus('');
  };

  // Выбор формата на карте в разделе «Работа»
  const formatCount = options.format.length;
  useEffect(() => {
    const onFormat = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (!Number.isInteger(index) || index < 0 || index >= formatCount) return;
      setValues((current) => ({ ...current, format: index }));
      setEdits((current) => ({ ...current, format: current.format + 1 }));
      setStatus('');
    };
    window.addEventListener('letter:format', onFormat);
    return () => window.removeEventListener('letter:format', onFormat);
  }, [formatCount]);

  // Список вариантов закрывается кликом мимо и клавишей Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(null);
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      slotRefs.current[open]?.focus();
      setOpen(null);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const parts = template.split(SLOT);
  const filled = parts.map((part, i) => (i % 2 ? options[part as LetterSlot][values[part as LetterSlot]] : part)).join('');
  const body = plain(filled).replace(/\n/g, '\r\n\r\n');
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const toggle = (slot: LetterSlot) => setOpen((current) => (current === slot ? null : slot));
  const onSlotKey = (event: KeyboardEvent<HTMLSpanElement>, slot: LetterSlot) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle(slot);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setStatus(labels.copied);
    } catch {
      // Буфер обмена недоступен (старый браузер, запрет): выделяем текст, дальше — Ctrl+C
      const range = document.createRange();
      if (textRef.current) range.selectNodeContents(textRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      setStatus(labels.selected);
    }
  };

  return (
    <div ref={rootRef} className="reveal mt-10 grid gap-5">
      <p className="text-sm text-muted">{hint}</p>

      <p ref={textRef} className="font-serif text-2xl md:text-3xl leading-[1.55] text-ink max-w-[34ch]">
        {parts.map((part, i) => {
          if (i % 2 === 0) return part;
          const slot = part as LetterSlot;
          return (
            <span
              key={slot}
              ref={(node) => { slotRefs.current[slot] = node; }}
              role="button"
              tabIndex={0}
              aria-expanded={open === slot}
              aria-controls={panelId}
              onClick={() => toggle(slot)}
              onKeyDown={(event) => onSlotKey(event, slot)}
              className={cn('letter-slot', open === slot && 'is-open')}
            >
              <span key={edits[slot]} className={cn(edits[slot] > 0 && 'letter-fresh')}>
                {options[slot][values[slot]]}
              </span>
            </span>
          );
        })}
      </p>

      <div id={panelId} role="group" aria-label={open ? captions[open] : undefined} hidden={!open} className="flex flex-wrap gap-2">
        {open && (
          <>
            <span className="w-full text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{captions[open]}</span>
            {options[open].map((option, index) => (
              <button
                key={option}
                type="button"
                aria-pressed={values[open] === index}
                onClick={() => {
                  const slot = open;
                  choose(slot, index);
                  setOpen(null);
                  slotRefs.current[slot]?.focus();
                }}
                className={cn(
                  'letter-choice rounded-full border px-4 py-2 text-left text-sm leading-snug transition-colors',
                  values[open] === index ? 'border-accent text-accent' : 'border-rule text-ink hover:border-ink',
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {option}
              </button>
            ))}
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={mailto}
          className="rounded-full bg-accent px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink whitespace-nowrap"
        >
          {labels.open}
        </a>
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-ink/40 px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink whitespace-nowrap"
        >
          {labels.copy}
        </button>
        <span role="status" className="text-sm text-muted">{status}</span>
      </div>
    </div>
  );
}
