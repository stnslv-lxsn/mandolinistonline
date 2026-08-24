import Balancer from 'react-wrap-balancer';
import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

export default function About() {
  return (
    <EditorialSection id="profile" number="01" title="Обо мне">
      {/* Журнальная цитата */}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink">
        <Balancer>
          {formatTypography('"Я не просто рисую стратегии на слайдах. Я помогаю перестроить процессы и мышление команды, чтобы эти стратегии заработали."')}
        </Balancer>
      </h2>

      {/* Две колонки текста */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-base leading-relaxed text-muted max-w-4xl font-light">
        <p>
          {formatTypography("За 20 лет управления бизнесом я поняла главное: любые структурные изменения упираются в людей. Поэтому мой подход объединяет жесткую бизнес-аналитику и понимание поведенческой психологии. Если вы видите, что компания перестала расти, а команда выгорает — проблема редко кроется только в KPI.")}
        </p>
        <p>
          {formatTypography("Моя философия проста: стратегия хороша ровно настолько, насколько хороша ее реализация. Я работаю напрямую с первыми лицами и управленческими командами, создавая среду, в которой решения не просто принимаются, но и исполняются.")}
        </p>
      </div>
    </EditorialSection>
  );
}
