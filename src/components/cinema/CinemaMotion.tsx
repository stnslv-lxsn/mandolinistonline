'use client';

import { useEffect } from 'react';

/**
 * Живые мелочи варианта IV: слои сцены слегка отзываются на курсор и на
 * прокрутку, а блоки ниже проявляются, когда доходят до экрана.
 *
 * Компонент ничего не рисует — только выставляет CSS-переменные на <body>,
 * всё движение считает CSS. Значения обновляются раз в кадр, слушатели
 * пассивные, так что скролл остаётся плавным.
 *
 * Ничего не включается, если система просит уменьшить движение. Класс
 * motion-ready ставится только из JS: без него [data-reveal] остаётся видимым,
 * и при отключённом JavaScript текст не пропадает.
 */
export default function CinemaMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    const root = document.body;
    root.classList.add('motion-ready');

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrolled = 0;

    // Смещения считаем сразу в пикселях: значение с единицами измерения
    // подставляется в transform напрямую, без calc() в стилях
    const apply = () => {
      frame = 0;
      root.style.setProperty('--bg-x', `${(pointerX * 10).toFixed(1)}px`);
      root.style.setProperty('--bg-y', `${(pointerY * 8 + scrolled * 42).toFixed(1)}px`);
      root.style.setProperty('--figure-x', `${(pointerX * -18).toFixed(1)}px`);
      root.style.setProperty('--figure-y', `${(pointerY * -11 - scrolled * 64).toFixed(1)}px`);
      // Передний план ближе всех к камере, поэтому смещается заметнее
      root.style.setProperty('--desk-x', `${(pointerX * -30).toFixed(1)}px`);
      root.style.setProperty('--desk-y', `${(pointerY * -14 - scrolled * 96).toFixed(1)}px`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const handlePointer = (event: PointerEvent) => {
      // От -1 до 1 относительно центра окна
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    const handleScroll = () => {
      // 0 в самом верху, 1 после первого экрана
      scrolled = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      schedule();
    };

    // Тонкая моторика мыши; на тач-устройствах события pointermove не сыплются
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Проявление блоков по мере прокрутки
    const targets = document.querySelectorAll('[data-reveal]');
    let revealed = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealed += 1;
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );
    targets.forEach((target) => observer.observe(target));

    // Страховка: скрытый контент опаснее отсутствующей анимации. Если за пару
    // секунд не проявился ни один блок (наблюдатель не отработал, вкладка была
    // в фоне, что-то упало) — снимаем режим движения, и текст просто виден.
    const failsafe = window.setTimeout(() => {
      if (revealed === 0) {
        root.classList.remove('motion-ready');
        observer.disconnect();
      }
    }, 2500);

    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(failsafe);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove('motion-ready');
      root.style.removeProperty('--bg-x');
      root.style.removeProperty('--bg-y');
      root.style.removeProperty('--figure-x');
      root.style.removeProperty('--figure-y');
      root.style.removeProperty('--desk-x');
      root.style.removeProperty('--desk-y');
    };
  }, []);

  return null;
}
