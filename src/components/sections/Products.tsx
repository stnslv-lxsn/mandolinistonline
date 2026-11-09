import EditorialSection from '@/components/EditorialSection';
import MarkLayer from '@/components/MarkLayer';
import { marked, type Mark } from '@/lib/marked';
import { formatTypography } from '@/lib/typography';

// Пять пунктов вместо семи: «Знаний хватает, но трудно сделать шаг…» повторял «Решение давно
// назрело…», а «Условия изменились…» и «То, что раньше работало…» объединены в один.
// Пометка от руки одна: зачёркнутое «откладываете» — жест консультанта, хватит откладывать.
// Список ситуаций в письме (Contact.tsx) повторяет эти пункты от первого лица
const situations: { text: string; marks?: Mark[] }[] = [
  { text: 'Нужно выбрать, а цена ошибки кажется слишком высокой' },
  { text: 'В команде каждый стоит на своём, и договориться не получается' },
  { text: 'Приходится решать там, где у вас пока нет опыта' },
  { text: 'Решение давно назрело, но вы снова его откладываете', marks: [{ phrase: 'откладываете', kind: 'strike' }] },
  { text: 'Условия изменились, и то, что раньше работало, перестало работать' },
];

export default function Products() {
  return (
    <EditorialSection id="expertise" number="02" title="Запросы">
      <div className="max-w-4xl">
        {/* Маркеры — кружки, а не номера: порядок здесь ничего не значит. Линии только
            между пунктами: над первым и под последним их нет, список начинается вровень
            с подписью раздела */}
        <ul>
          {situations.map((situation) => (
            <li key={situation.text} className="reveal relative border-t border-rule first:border-t-0 first:pt-0 py-4 md:py-5 flex gap-5 md:gap-8 items-start min-w-0">
              {/* Кружок по центру первой строки: (высота строки − 8px) / 2 при 24/30px и leading-snug */}
              <span aria-hidden="true" className="mt-[12.5px] md:mt-[16.6px] size-2 shrink-0 rounded-full border border-ink/60" />
              <p className="font-serif text-2xl md:text-3xl leading-snug text-ink text-pretty">
                {situation.marks ? marked(situation.text, situation.marks) : formatTypography(situation.text)}
              </p>
              {situation.marks && <MarkLayer />}
            </li>
          ))}
        </ul>
        <p className="reveal mt-6 text-sm md:text-base text-muted leading-relaxed max-w-2xl">
          {formatTypography('Вместе разберём, что вас сдерживает и какое решение подойдёт вашим условиям.')}
        </p>
      </div>
    </EditorialSection>
  );
}
