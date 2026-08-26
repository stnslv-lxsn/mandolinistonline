/**
 * Вырезает фигуру из портрета — для полноэкранной сцены варианта IV нужен
 * человек без фона, иначе поверх кабинета лежит вторая фотография.
 *
 * Запуск: npm run cutout
 * Считается один раз на машине разработчика, результат (assets/cutout.png)
 * коммитится, поэтому на сборке хостинга модель не нужна.
 */
import { writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const SOURCE = 'assets/scene-close.jpg';
const OUT = 'assets/cutout.png';

// Пакет с моделью весит под 200 МБ и нужен раз в сто лет, поэтому в
// зависимостях проекта его нет — иначе он тянулся бы в каждую сборку хостинга
let removeBackground;
try {
  ({ removeBackground } = await import('@imgly/background-removal-node'));
} catch {
  console.error(
    'Нет пакета сегментации. Поставьте его разово:\n' +
      '  npm i -D @imgly/background-removal-node\n' +
      'После вырезания его можно удалить — результат лежит в assets/cutout.png'
  );
  process.exit(1);
}

if (!existsSync(SOURCE)) {
  console.error(`Нет исходника: ${SOURCE}`);
  process.exit(1);
}

console.log(`Вырезаю фигуру из ${SOURCE} — первый запуск скачивает модель, это долго…`);

const blob = await removeBackground(SOURCE, {
  // В пакете лежат только small и medium; medium заметно чище на волосах
  model: 'medium',
  output: { format: 'image/png', quality: 1 },
});

await writeFile(OUT, Buffer.from(await blob.arrayBuffer()));

const { size } = await stat(OUT);
console.log(`Готово: ${OUT}, ${(size / 1024 / 1024).toFixed(1)} MB`);
