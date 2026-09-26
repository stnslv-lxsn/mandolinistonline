import type { ReactNode } from 'react';
import type { MarkKind } from '@/components/MarkLayer';
import { formatTypography } from '@/lib/typography';

export interface Mark {
  /** Фраза из текста, как она написана, без неразрывных пробелов */
  phrase: string;
  kind: MarkKind;
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Прогоняет текст через типограф и оборачивает отмеченные фразы в <span data-mark>,
 * вокруг которых MarkLayer рисует пометки. Типограф работает с текстом целиком,
 * поэтому неразрывные пробелы на границах фраз стоят так же, как без пометок.
 *
 * Если фразы в тексте нет, сборка падает: пометка не должна тихо пропасть после правки текста.
 */
export function marked(text: string, marks: Mark[]): ReactNode[] {
  const formatted = formatTypography(text);

  const found = marks
    .map((mark) => {
      // Между словами фразы типограф мог поставить неразрывный пробел
      const pattern = mark.phrase.trim().split(/\s+/).map(escapeRegExp).join('[\\s\\u00A0]+');
      const match = new RegExp(pattern, 'u').exec(formatted);
      if (!match) throw new Error(`Пометка «${mark.phrase}» не найдена в тексте «${text}»`);
      return { kind: mark.kind, start: match.index, end: match.index + match[0].length };
    })
    .sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;
  found.forEach((mark, index) => {
    if (mark.start < cursor) throw new Error(`Пометки в тексте «${text}» пересекаются`);
    nodes.push(formatted.slice(cursor, mark.start));
    nodes.push(<span key={index} data-mark={mark.kind}>{formatted.slice(mark.start, mark.end)}</span>);
    cursor = mark.end;
  });
  nodes.push(formatted.slice(cursor));
  return nodes;
}
