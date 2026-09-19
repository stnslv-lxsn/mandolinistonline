type ClassValue = string | false | null | undefined;

/**
 * Склеивает классы, отбрасывая пустые значения.
 *
 * Намеренно без clsx/tailwind-merge: обе библиотеки уезжали в клиентский
 * бандл ради одной функции. Взаимоисключающие классы (например opacity-0 /
 * opacity-100) выбирайте тернарником, а не наслаивайте — разрешать конфликты тут некому.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
