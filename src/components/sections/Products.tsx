import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const situations = [
  'Нужно выбрать, а цена ошибки кажется слишком высокой',
  'В команде каждый стоит на своём, и договориться не получается',
  'Приходится решать там, где у вас пока нет опыта',
  'Решение давно назрело, но вы снова его откладываете',
  'То, что раньше работало, вдруг перестало работать',
  'Условия изменились, и бизнес нужно перестраивать',
  'Знаний хватает, но трудно сделать шаг, когда впереди неизвестность',
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
            <li key={situation} className="reveal border-t border-rule first:border-t-0 first:pt-0 py-4 md:py-5 flex gap-5 md:gap-8 items-start min-w-0">
              {/* Кружок по центру первой строки: (высота строки − 8px) / 2 при 24/30px и leading-snug */}
              <span aria-hidden="true" className="mt-[12.5px] md:mt-[16.6px] size-2 shrink-0 rounded-full border border-ink/60" />
              <p className="font-serif text-2xl md:text-3xl leading-snug text-ink text-pretty">
                {formatTypography(situation)}
              </p>
            </li>
          ))}
        </ul>
        <p className="reveal mt-6 text-sm md:text-base text-muted leading-relaxed max-w-2xl">
          {formatTypography('Вместе посмотрим на ситуацию целиком: что вас сдерживает, какие есть варианты и какое решение подойдёт именно вашим условиям.')}
        </p>
      </div>
    </EditorialSection>
  );
}
