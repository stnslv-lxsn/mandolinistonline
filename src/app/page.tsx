'use client';

import React from 'react';
import Layout from '@/components/Layout';
import EditorialSection from '@/components/EditorialSection';
import { ArrowUpRight } from 'lucide-react';

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
              Помогаю компаниям проходить через кризисы управления и масштабирования. 
              Соединяю 20-летний опыт в бизнесе с глубоким пониманием психологии систем.
            </p>
          </div>

          <div className="hidden md:block pt-8">
             <a href="#contact" className="inline-flex bg-[#1D332D] text-white px-8 py-4 font-medium text-sm hover:bg-[#11201c] transition-colors uppercase tracking-[0.2em]">
                Обсудить задачу
             </a>
          </div>
        </div>
        
        {/* Фотография в круге как на референсе */}
        <div className="md:w-2/5 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden bg-black/5 shadow-2xl">
            {/* Заглушка вместо реального фото, так как файла нет */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-500 font-serif italic text-lg text-center p-4">
              [Место для<br/>фотографии]
            </div>
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ 01: ПРОФИЛЬ */}
      <EditorialSection id="profile" number="01" title="Обо мне">
        {/* Журнальная цитата */}
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-[#222222]">
          "Я не просто рисую стратегии на слайдах. Я помогаю перестроить процессы и мышление команды, чтобы эти стратегии заработали."
        </h2>
        
        {/* Две колонки текста */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-base leading-relaxed text-[#666666] max-w-4xl font-light">
          <p>
            За 20 лет управления бизнесом я поняла главное: любые структурные изменения упираются в людей. 
            Поэтому мой подход объединяет жесткую бизнес-аналитику и понимание поведенческой психологии.
            Если вы видите, что компания перестала расти, а команда выгорает — проблема редко кроется только в KPI.
          </p>
          <p>
            Моя философия проста: стратегия хороша ровно настолько, насколько хороша ее реализация. 
            Я работаю напрямую с первыми лицами и управленческими командами, создавая среду, 
            в которой решения не просто принимаются, но и исполняются.
          </p>
        </div>
      </EditorialSection>

      {/* СЕКЦИЯ 02: ЭКСПЕРТИЗА */}
      <EditorialSection id="expertise" number="02" title="Продукты">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          
          {/* Карточка 1 */}
          <div className="group border-t-2 border-transparent hover:border-[#222222] transition-colors pt-6 cursor-pointer">
            <h3 className="font-serif text-3xl italic mb-6 text-[#222222]">Стратегические<br/>сессии</h3>
            <p className="text-sm md:text-base text-[#666666] mb-8 font-light leading-relaxed">
              Выравнивание видения фаундеров и топ-менеджмента. Поиск точек роста и преодоление управленческих кризисов.
            </p>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-[#222222] flex items-center gap-2 group-hover:gap-4 transition-all">
              Подробнее <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Карточка 2 */}
          <div className="group border-t-2 border-transparent hover:border-[#222222] transition-colors pt-6 cursor-pointer">
            <h3 className="font-serif text-3xl italic mb-6 text-[#222222]">Аудит<br/>управления</h3>
            <p className="text-sm md:text-base text-[#666666] mb-8 font-light leading-relaxed">
              Глубокий анализ процессов, коммуникации и ролей в команде. Выявление скрытых конфликтов и узких мест.
            </p>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-[#222222] flex items-center gap-2 group-hover:gap-4 transition-all">
              Подробнее <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Карточка 3 */}
          <div className="group border-t-2 border-transparent hover:border-[#222222] transition-colors pt-6 cursor-pointer">
            <h3 className="font-serif text-3xl italic mb-6 text-[#222222]">Личное<br/>менторство</h3>
            <p className="text-sm md:text-base text-[#666666] mb-8 font-light leading-relaxed">
              Индивидуальная работа с CEO и собственниками по преодолению тупиков, профессионального выгорания и масштабированию.
            </p>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-[#222222] flex items-center gap-2 group-hover:gap-4 transition-all">
              Подробнее <ArrowUpRight size={16} />
            </button>
          </div>

        </div>
      </EditorialSection>

      {/* СЕКЦИЯ 03: КОНТАКТЫ */}
      <EditorialSection id="contact" number="03" title="Контакты" className="pb-32">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl mb-8">Готовы обсудить вашу задачу?</h2>
          <p className="text-[#666666] mb-12 font-light text-lg">
            Напишите мне, чтобы запланировать ознакомительную встречу. Мы обсудим вашу текущую ситуацию и определим формат работы.
          </p>
          <a href="mailto:hello@example.com" className="text-2xl md:text-3xl font-serif text-[#222222] hover:text-[#666666] transition-colors border-b border-[#222222] pb-2">
            hello@egor-consulting.com
          </a>
        </div>
      </EditorialSection>

    </Layout>
  );
}