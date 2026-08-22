'use client';






import React from 'react';
import Layout from '@/components/Layout';
import EditorialSection from '@/components/EditorialSection';
import { ArrowUpRight } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import Image from 'next/image';

// Функция для замены обычных пробелов на неразрывные после предлогов и союзов
const formatTypography = (text: string) => {
  // Список предлогов, союзов и частиц (русских)
  const prepositions = ['в', 'без', 'до', 'из', 'к', 'на', 'по', 'о', 'от', 'перед', 'при', 'через', 'с', 'у', 'за', 'над', 'об', 'под', 'про', 'для', 'и', 'а', 'но', 'да', 'или', 'не', 'ни', 'же', 'бы', 'ли', 'я', 'он', 'мы', 'вы'];
  
  let formattedText = text;
  prepositions.forEach(prep => {
    // Регулярка ищет предлог, окруженный пробелами (или началом строки)
    // $1 - начало строки или пробел, $2 - предлог
    const regex = new RegExp(`(^|\\s)(${prep})\\s+`, 'gi');
    // Заменяем пробел после предлога на неразрывный пробел (&nbsp; или \u00A0)
    formattedText = formattedText.replace(regex, '$1$2\u00A0');
  });
  return formattedText;
};

export default function Home() {
  return (
    <Layout>
      
      {/* ПЕРВЫЙ ЭКРАН (Hero Section) */}
      <section className="px-6 md:px-12 pt-32 pb-24 md:pt-48 md:pb-32 max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-12 min-h-[90vh]">
        
        <div className="md:w-3/5 flex flex-col gap-8 md:gap-10">
          <div>
            <p className="font-serif italic text-xl md:text-2xl text-[#666666] mb-4">
              Бизнес-консультант, исследователь
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-none text-[#222222] tracking-tight mb-8">
              Егор
            </h1>
            <p className="font-sans text-lg md:text-xl text-[#666666] max-w-2xl leading-relaxed">
              <Balancer>
                {formatTypography("Помогаю компаниям проходить через кризисы управления и масштабирования. Соединяю 20-летний опыт в бизнесе с глубоким пониманием психологии систем.")}
              </Balancer>
            </p>
          </div>

          <div className="hidden md:block pt-8">
             <a href="#contact" className="inline-flex bg-[#1D332D] text-white px-8 py-4 font-medium text-sm hover:bg-[#11201c] transition-colors uppercase tracking-[0.2em]">
                Обсудить задачу
             </a>
          </div>
        </div>
        
        {/* Фотография в круге */}
        <div className="md:w-2/5 flex justify-center md:justify-end shrink-0 relative">
          {/* Приятный ореол (Glow effect) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-[#1D332D]/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden bg-black/5 shadow-2xl shrink-0">
            <img 
              src="/photo.jpg" 
              alt="Егор" 
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ 01: ПРОФИЛЬ */}
      <EditorialSection id="profile" number="01" title="Обо мне">
        {/* Журнальная цитата */}
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-[#222222]">
          <Balancer>
            {formatTypography('"Я не просто рисую стратегии на слайдах. Я помогаю перестроить процессы и мышление команды, чтобы эти стратегии заработали."')}
          </Balancer>
        </h2>
        
        {/* Две колонки текста */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-base leading-relaxed text-[#666666] max-w-4xl font-light">
          <p>
            {formatTypography("За 20 лет управления бизнесом я поняла главное: любые структурные изменения упираются в людей. Поэтому мой подход объединяет жесткую бизнес-аналитику и понимание поведенческой психологии. Если вы видите, что компания перестала расти, а команда выгорает — проблема редко кроется только в KPI.")}
          </p>
          <p>
            {formatTypography("Моя философия проста: стратегия хороша ровно настолько, насколько хороша ее реализация. Я работаю напрямую с первыми лицами и управленческими командами, создавая среду, в которой решения не просто принимаются, но и исполняются.")}
          </p>
        </div>
      </EditorialSection>

      {/* СЕКЦИЯ 02: ЭКСПЕРТИЗА */}
      <EditorialSection id="expertise" number="02" title="Продукты">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          
          {/* Карточка 1 */}
          <div className="group border-t-2 border-transparent hover:border-[#222222] transition-colors pt-6 cursor-pointer flex flex-col h-full min-w-0">
            <h3 className="font-serif text-3xl italic mb-6 text-[#222222] break-words hyphens-auto">
              <Balancer>{formatTypography("Стратегические сессии")}</Balancer>
            </h3>
            <p className="text-sm md:text-base text-[#666666] mb-8 font-light leading-relaxed flex-grow">
              {formatTypography("Выравнивание видения фаундеров и топ-менеджмента. Поиск точек роста и преодоление управленческих кризисов.")}
            </p>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-[#222222] flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
              Подробнее <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Карточка 2 */}
          <div className="group border-t-2 border-transparent hover:border-[#222222] transition-colors pt-6 cursor-pointer flex flex-col h-full min-w-0">
            <h3 className="font-serif text-3xl italic mb-6 text-[#222222] break-words hyphens-auto">
              <Balancer>{formatTypography("Аудит управления")}</Balancer>
            </h3>
            <p className="text-sm md:text-base text-[#666666] mb-8 font-light leading-relaxed flex-grow">
              {formatTypography("Глубокий анализ процессов, коммуникации и ролей в команде. Выявление скрытых конфликтов и узких мест.")}
            </p>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-[#222222] flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
              Подробнее <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Карточка 3 */}
          <div className="group border-t-2 border-transparent hover:border-[#222222] transition-colors pt-6 cursor-pointer flex flex-col h-full min-w-0">
            <h3 className="font-serif text-3xl italic mb-6 text-[#222222] break-words hyphens-auto">
              <Balancer>{formatTypography("Личное менторство")}</Balancer>
            </h3>
            <p className="text-sm md:text-base text-[#666666] mb-8 font-light leading-relaxed flex-grow">
              {formatTypography("Индивидуальная работа с CEO и собственниками по преодолению тупиков, профессионального выгорания и масштабированию.")}
            </p>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-[#222222] flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
              Подробнее <ArrowUpRight size={16} />
            </button>
          </div>

        </div>
      </EditorialSection>

      {/* СЕКЦИЯ 03: КОНТАКТЫ */}
      <EditorialSection id="contact" number="03" title="Контакты" className="pb-32">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl mb-8">
            <Balancer>{formatTypography("Готовы обсудить вашу задачу?")}</Balancer>
          </h2>
          <p className="text-[#666666] mb-12 font-light text-lg">
            {formatTypography("Напишите мне, чтобы запланировать ознакомительную встречу. Мы обсудим вашу текущую ситуацию и определим формат работы.")}
          </p>
          <a href="mailto:hello@egor-consulting.com" className="text-2xl md:text-3xl font-serif text-[#222222] hover:text-[#666666] transition-colors border-b border-[#222222] pb-2 break-all">
            hello@egor-consulting.com
          </a>
        </div>
      </EditorialSection>

    </Layout>
  );
}