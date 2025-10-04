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

// Карта настроений для обратной конвертации (точное соответствие)
const moodMap: Record<string, string> = {
  'veseloe': 'Весёлое',
  'smeshnoe': 'Смешное',
  'spokoynoe': 'Спокойное',
  'romantichnoye': 'Романтичное',
  'vlyublyonnoye': 'Влюблённое',
  'teploye': 'Тёплое',
  'vdohnovlyonnoye': 'Вдохновлённое',
  'prazdnichnoye': 'Праздничное',
  'energichnoye': 'Энергичное',
  'motivirovannoye': 'Мотивированное',
  'ambitsyoznoye': 'Амбициозное',
  'drayvovoe': 'Драйвовое',
  'zadumchivoye': 'Задумчивое',
  'filosofskoye': 'Философское',
  'dramatichnoye': 'Драматичное',
  'poznavatelnoye': 'Познавательное',
  'grustnoye': 'Грустное',
  'napryazhyonnoye': 'Напряжённое',
  'trevozhnoye': 'Тревожное',
  'nostalgicheskoye': 'Ностальгическое',
  'razdrazhyonnoye': 'Раздражённое',
  'sonnoye': 'Сонное',
  'bezumnoye': 'Безумное',
  'meditativnoye': 'Медитативное',
  'sluchaynoye': 'Случайное'
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
