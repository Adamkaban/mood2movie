// Карта транслитерации русских букв в латиницу
const rusToLat: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
  'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
  'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
  'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

// Обратная карта для деконвертации
const latToRus: Record<string, string> = {
  'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е', 'yo': 'ё', 'zh': 'ж',
  'z': 'з', 'i': 'и', 'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о',
  'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'f': 'ф', 'h': 'х', 'ts': 'ц',
  'ch': 'ч', 'sh': 'ш', 'sch': 'щ', 'yu': 'ю', 'ya': 'я'
};

// Карта настроений для обратной конвертации (точное соответствие slug -> настроение)
const moodMap: Record<string, string> = {
  'vesyoloe': 'Весёлое',
  'smeshnoe': 'Смешное',
  'spokoynoe': 'Спокойное',
  'romantichnoe': 'Романтичное',
  'vlyublyonnoe': 'Влюблённое',
  'tyoploe': 'Тёплое',
  'vdohnovlyonnoe': 'Вдохновлённое',
  'prazdnichnoe': 'Праздничное',
  'energichnoe': 'Энергичное',
  'motivirovannoe': 'Мотивированное',
  'ambitsioznoe': 'Амбициозное',
  'drayvovoe': 'Драйвовое',
  'zadumchivoe': 'Задумчивое',
  'filosofskoe': 'Философское',
  'dramatichnoe': 'Драматичное',
  'poznavatelnoe': 'Познавательное',
  'grustnoe': 'Грустное',
  'napryazhyonnoe': 'Напряжённое',
  'trevozhnoe': 'Тревожное',
  'nostalgicheskoe': 'Ностальгическое',
  'razdrazhyonnoe': 'Раздражённое',
  'sonnoe': 'Сонное',
  'bezumnoe': 'Безумное',
  'meditativnoe': 'Медитативное',
  'sluchaynoe': 'Случайное'
};

/**
 * Конвертирует русский текст в транслит (латиницу)
 */
export function toTranslit(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map(char => rusToLat[char] || char)
    .join('');
}

/**
 * Конвертирует транслит обратно в русский текст (для настроений)
 */
export function fromTranslit(translit: string): string {
  const normalized = translit.toLowerCase();
  
  // Сначала пробуем найти точное совпадение в карте настроений
  if (moodMap[normalized]) {
    return moodMap[normalized];
  }
  
  // Если не нашли в карте, пробуем обратную транслитерацию
  // Сортируем ключи по длине (от длинных к коротким) для правильного матчинга
  const sortedKeys = Object.keys(latToRus).sort((a, b) => b.length - a.length);
  
  let result = normalized;
  for (const key of sortedKeys) {
    result = result.replace(new RegExp(key, 'g'), latToRus[key]);
  }
  
  // Делаем первую букву заглавной
  return result.charAt(0).toUpperCase() + result.slice(1);
}
