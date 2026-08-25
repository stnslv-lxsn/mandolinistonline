import { ArrowUpRight } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const products = [
  {
    title: "Стратегические сессии",
    description: "Выравнивание видения фаундеров и топ-менеджмента. Поиск точек роста и преодоление управленческих кризисов.",
  },
  {
    title: "Аудит управления",
    description: "Глубокий анализ процессов, коммуникации и ролей в команде. Выявление скрытых конфликтов и узких мест.",
  },
  {
    title: "Личное менторство",
    description: "Индивидуальная работа с CEO и собственниками по преодолению тупиков, профессионального выгорания и масштабированию.",
  },
];

export default function Products() {
  return (
    <EditorialSection id="expertise" number="02" title="Продукты">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {products.map((product) => (
          <div key={product.title} className="group border-t-2 border-transparent hover:border-black/20 transition-colors pt-6 cursor-pointer flex flex-col h-full min-w-0">
            <h3 className="font-serif text-3xl italic mb-6 text-ink break-words hyphens-auto">
              <Balancer>{formatTypography(product.title)}</Balancer>
            </h3>
            <p className="text-sm md:text-base text-muted mb-8 font-light leading-relaxed flex-grow">
              {formatTypography(product.description)}
            </p>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-ink flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
              Подробнее <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </EditorialSection>
  );
}
