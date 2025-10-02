# 🚀 Полное руководство по деплою Mood2movie на Vercel

## ✅ Что сделано для адаптации под Vercel

Ваш проект полностью адаптирован для Vercel:

- ✅ **Serverless API** - создан `/api/movie/recommend.ts` (Vercel Functions)
- ✅ **vercel.json** - настроена маршрутизация и CORS
- ✅ **Проверка переменных** - автоматическая валидация API ключей
- ✅ **SEO оптимизация** - все элементы (robots.txt, sitemap.xml, метатеги) сохранены
- ✅ **Рекламный баннер** - работает на всех страницах
- ✅ **Яркая favicon** - поп-корн иконка

## 📋 Пошаговая инструкция деплоя

### Шаг 1: Установка Vercel CLI

```bash
# Установите Vercel CLI глобально
npm install -g vercel
```

### Шаг 2: Подготовка к деплою

#### 2.1 Проверьте файлы

Убедитесь, что существуют:
- ✅ `api/movie/recommend.ts` - serverless функция
- ✅ `vercel.json` - конфигурация
- ✅ `client/public/robots.txt` - индексация
- ✅ `client/public/sitemap.xml` - карта сайта
- ✅ `client/public/favicon.svg` - иконка

#### 2.2 Создайте Git репозиторий (если еще нет)

```bash
# Инициализация git
git init

# Добавьте все файлы
git add .

# Коммит
git commit -m "Ready for Vercel deployment with serverless API"

# Создайте репозиторий на GitHub.com, затем:
git remote add origin https://github.com/ваш-username/mood2movie.git
git branch -M main
git push -u origin main
```

### Шаг 3: Деплой через Vercel Dashboard (Рекомендуется)

1. **Откройте [vercel.com](https://vercel.com)** и войдите через GitHub

2. **Создайте новый проект:**
   - Нажмите **"New Project"**
   - Выберите репозиторий `mood2movie`
   - Нажмите **"Import"**

3. **Настройте проект:**
   
   **Build Settings:**
   - Framework Preset: **Vite**
   - Root Directory: **`./`** (оставьте по умолчанию)
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

4. **Добавьте переменные окружения:**
   
   В разделе **Environment Variables** добавьте:
   
   ```
   OPENROUTER_API_KEY = ваш_ключ_openrouter
   KINOPOISK_API_KEY = ваш_ключ_kinopoisk
   SESSION_SECRET = любая_случайная_строка_минимум_32_символа
   ```
   
   **Где взять ключи:**
   - **OpenRouter API Key**: https://openrouter.ai/keys (бесплатная регистрация)
   - **Kinopoisk API Key**: https://kinopoisk.dev (получить ключ)

5. **Деплой:**
   - Нажмите **"Deploy"**
   - Подождите 2-3 минуты
   - Ваш сайт будет доступен по адресу: `https://mood2movie.vercel.app`

### Шаг 4: Подключение домена mood2movie.ru

#### 4.1 Добавление домена в Vercel

1. Откройте ваш проект в Vercel Dashboard
2. Перейдите в **Settings** → **Domains**
3. Нажмите **"Add"**
4. Введите `mood2movie.ru`
5. Нажмите **"Add"**
6. Также добавьте `www.mood2movie.ru` (опционально)

#### 4.2 Настройка DNS у регистратора

Vercel покажет вам DNS записи. У вашего регистратора домена добавьте:

**Вариант A: A-запись (Рекомендуется)**

| Тип | Имя | Значение | TTL |
|-----|-----|----------|-----|
| **A** | `@` | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

> **Важно:** Используйте IP адрес, который показывает Vercel в вашем дашборде!

**Если есть CAA записи**, добавьте:
```
Тип: CAA
Имя: @
Значение: 0 issue "letsencrypt.org"
```

**Вариант B: Nameservers (Полное управление через Vercel)**

Замените nameservers у регистратора на:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

⚠️ **Внимание:** Это передаст полное управление DNS в Vercel. Сначала мигрируйте все существующие DNS записи (email, поддомены).

#### 4.3 Ожидание активации

- **DNS изменения**: 5 минут - 48 часов (обычно < 1 час)
- **SSL сертификат**: выдается автоматически (Let's Encrypt)
- **Проверка**: https://dnschecker.org - проверьте распространение

### Шаг 5: Проверка работы сайта

После активации проверьте:

```
✅ https://mood2movie.ru - главная страница
✅ https://mood2movie.ru/movie?mood=Весёлое - страница фильма  
✅ https://mood2movie.ru/robots.txt - индексация
✅ https://mood2movie.ru/sitemap.xml - карта сайта
✅ https://mood2movie.ru/favicon.svg - иконка
```

**Проверка API:**
```bash
curl -X POST https://mood2movie.ru/api/movie/recommend \
  -H "Content-Type: application/json" \
  -d '{"mood":"Весёлое"}'
```

## 🔧 Локальное тестирование с Vercel CLI

Перед деплоем протестируйте локально:

```bash
# Установите зависимости
npm install

# Запустите Vercel dev сервер
vercel dev

# Откройте http://localhost:3000
```

Vercel Dev эмулирует serverless окружение локально.

## 🔄 Автоматические обновления

После первого деплоя все обновления автоматические:

```bash
# Внесите изменения в код
git add .
git commit -m "Update: описание изменений"
git push

# Vercel автоматически задеплоит новую версию!
```

**Preview деплои:** Каждая ветка и PR получают свой preview URL.

## 📊 Мониторинг и логи

### Просмотр логов

1. **Vercel Dashboard** → ваш проект → **Deployments**
2. Выберите деплой → **Function Logs**
3. Фильтруйте по `/api/movie/recommend`

### Real-time Analytics

- **Settings** → **Analytics** - трафик, производительность
- **Speed Insights** - Core Web Vitals
- **Audience** - география пользователей

## ⚙️ Переменные окружения

### Добавление новых переменных

1. **Settings** → **Environment Variables**
2. Нажмите **"Add New"**
3. Выберите окружение:
   - **Production** - для mood2movie.ru
   - **Preview** - для preview веток
   - **Development** - для `vercel dev`
4. Сохраните
5. **Redeploy** проект

### Обновление существующих

1. Найдите переменную
2. Нажмите **"Edit"**
3. Измените значение
4. **Redeploy** для применения

## 🎯 SEO оптимизация для Яндекса

Все SEO элементы уже настроены:

### ✅ Что работает:

1. **robots.txt** - правила для Яндекс и Google ботов
2. **sitemap.xml** - все 12 страниц настроений проиндексированы
3. **Метатеги:**
   - Уникальные title для каждой страницы
   - Динамические descriptions с названием фильма
   - Open Graph для соцсетей
   - Twitter Cards
4. **Schema.org разметка:**
   - WebSite schema на главной
   - Movie schema на страницах фильмов
   - JSON-LD формат
5. **SEO контент:**
   - Ключевые фразы: "подбор фильмов", "кино под настроение"
   - Оптимизация под запросы "какой фильм посмотреть"
6. **Яркая favicon** - попкорн иконка

### Проверка индексации:

```
site:mood2movie.ru  # в Яндексе
```

## 🐛 Устранение проблем

### API не работает (500 ошибка)

**Проверьте:**
1. Переменные окружения установлены?
2. Логи в Vercel Dashboard → Function Logs
3. Проверьте лимиты API ключей

```bash
# Локальная проверка
vercel dev
curl -X POST http://localhost:3000/api/movie/recommend \
  -H "Content-Type: application/json" \
  -d '{"mood":"Весёлое"}'
```

### CORS ошибки

Уже настроены в `vercel.json`. Если проблема:

```json
"headers": [
  {
    "source": "/api/(.*)",
    "headers": [
      { "key": "Access-Control-Allow-Origin", "value": "*" }
    ]
  }
]
```

### Домен не работает

1. Проверьте DNS: `nslookup mood2movie.ru`
2. Проверьте propagation: https://dnschecker.org
3. Подождите до 48 часов
4. Проверьте CAA записи для SSL

### Медленная работа

- **Cold start:** первый запрос после 15 мин простоя ~1-2 сек
- **Решение:** Reserved VM ($10/мес) или увеличьте трафик

### Логи не показывают ошибки

```bash
# Используйте Vercel CLI
vercel logs mood2movie --follow

# Или для конкретного деплоя
vercel logs [deployment-url]
```

## 💰 Стоимость Vercel

### Бесплатный план (Hobby):

- ✅ 100 GB bandwidth/месяц
- ✅ Serverless Functions: 100 часов/месяц
- ✅ Таймаут: 10 секунд
- ✅ Custom домены: unlimited
- ✅ Automatic SSL/HTTPS
- ✅ Automatic deployments

**Для mood2movie.ru:**
- Прогноз: 100% бесплатно при трафике <10,000 посетителей/месяц
- Serverless функции используются только при запросах

### Pro план ($20/мес):

- 1 TB bandwidth
- 1000 часов функций
- 60 сек таймаут
- Priority support

## 📚 Полезные команды

```bash
# Логин в Vercel
vercel login

# Деплой (preview)
vercel

# Деплой (production)
vercel --prod

# Просмотр деплоев
vercel ls

# Логи
vercel logs

# Удалить деплой
vercel rm [deployment-url]

# Переменные окружения
vercel env ls
vercel env add VARIABLE_NAME production
vercel env rm VARIABLE_NAME production
```

## 🎉 Готово!

Ваш сайт **mood2movie.ru** развернут на Vercel с:

- ✅ Serverless API (OpenRouter + Kinopoisk)
- ✅ Полная SEO оптимизация для Яндекса
- ✅ Рекламный баннер
- ✅ Яркая favicon
- ✅ Автоматический SSL
- ✅ Автоматические деплои через Git

**Первые шаги:**
1. Загрузите код на GitHub
2. Подключите репозиторий к Vercel
3. Добавьте переменные окружения
4. Деплой → Подключите домен → Готово!

**Поддержка:**
- Документация: https://vercel.com/docs
- Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions
