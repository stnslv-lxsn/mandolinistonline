import Balancer from 'react-wrap-balancer';
import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

export default function About() {
  return (
    <EditorialSection id="profile" number="01" title="Обо мне">
      {/* Журнальная цитата */}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink">
        <Balancer>
          {formatTypography('Управленческую реальность я знаю изнутри: решения приходится принимать при неполной информации, расхождении интересов и высокой цене ошибки.')}
        </Balancer>
      </h2>

      {/* Две колонки текста */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-base leading-relaxed text-muted max-w-4xl font-light">
        <p>
          {formatTypography("Двадцать лет в управлении и бизнесе. Последние шесть — в e-commerce: развитие направления продаж на маркетплейсах с оборотом более 900 млн рублей в год. Управление командами и коммерческими процессами — от ассортимента и контента до логистики и аналитики площадок.")}
        </p>
        <p>
          {formatTypography("Психологическое образование с фокусом на краткосрочные и доказательные методы, подготовка в области коучинга, практика консультирования. Профессиональный интерес лежит на пересечении психологии и управления: что происходит с руководителем в момент сложного решения.")}
        </p>
      </div>
    </EditorialSection>
  );
}
