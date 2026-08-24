type ClassValue = string | false | null | undefined;

/**
 * Склеивает классы, отбрасывая пустые значения.
 *
 * Намеренно без clsx/tailwind-merge: обе библиотеки уезжали в клиентский
 * бандл ради одной функции. Взаимоисключающие классы (например py-5 / py-4)
 * выбирайте тернарником, а не наслаивайте — разрешать конфликты тут некому.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
