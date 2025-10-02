# 🚀 Деплой Mood2movie на Vercel

## Подготовка к деплою

### 1. Загрузка на GitHub

```bash
# Инициализация git (если еще не сделано)
git init

# Добавление всех файлов
git add .

# Коммит
git commit -m "Ready for Vercel deployment"

# Создайте репозиторий на GitHub и добавьте remote
git remote add origin https://github.com/ваш-username/mood2movie.git

# Пуш
git push -u origin main
```

### 2. Деплой на Vercel

#### Через Vercel Dashboard (Рекомендуется)

1. Зайдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите **"New Project"**
4. Выберите репозиторий `mood2movie`
5. Настройте проект:
   - **Framework Preset:** Vite
   - **Root Directory:** `.`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
   - **Install Command:** `npm install`

6. **Добавьте переменные окружения:**
   - Перейдите в **Environment Variables**
   - Добавьте все переменные из `.env.example`:
     ```
     OPENROUTER_API_KEY = ваш_ключ_openrouter
     KINOPOISK_API_KEY = ваш_ключ_kinopoisk
     SESSION_SECRET = ваш_секрет
     ```

7. Нажмите **Deploy**

#### Через Vercel CLI

```bash
# Установка CLI
npm i -g vercel

# Вход
vercel login

# Деплой
vercel

# Продакшн деплой
vercel --prod
```

### 3. Подключение домена mood2movie.ru

После успешного деплоя:

1. В Vercel Dashboard откройте проект
2. Перейдите в **Settings** → **Domains**
3. Нажмите **Add Domain**
4. Введите `mood2movie.ru`
5. Vercel покажет DNS записи для добавления

### 4. Настройка DNS у регистратора

У вашего регистратора домена `.ru` добавьте:

#### Вариант A: A-запись (Рекомендуется)

| Тип | Имя | Значение | TTL |
|-----|-----|----------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

> **Важно:** Используйте IP адрес, который показывает Vercel в вашем дашборде!

#### Вариант B: Nameservers (Полное управление через Vercel)

Замените nameservers у регистратора на:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### 5. Ожидание активации

- DNS обновление: 5 минут - 48 часов (обычно < 1 часа)
- SSL сертификат: автоматически выдается после проверки DNS
- Проверка: [dnschecker.org](https://dnschecker.org)

### 6. Проверка работы

После деплоя проверьте:

```
✓ https://mood2movie.ru - главная страница
✓ https://mood2movie.ru/movie?mood=Весёлое - страница фильма
✓ https://mood2movie.ru/api/movie/recommend - API endpoint
```

## Обновление сайта

Все обновления автоматические через Git:

```bash
# Внесите изменения в код
git add .
git commit -m "Update: описание изменений"
git push

# Vercel автоматически задеплоит новую версию!
```

## Переменные окружения в Vercel

Добавить/изменить в Dashboard:

1. Settings → Environment Variables
2. Добавьте новую переменную
3. Выберите окружение: Production / Preview / Development
4. Сохраните
5. Redeploy проекта для применения

## Устранение проблем

### CORS ошибки
Уже настроены в `server/routes.ts`

### 404 на API routes
Проверьте `vercel.json` - роуты должны начинаться с `/api/`

### Медленная работа
Vercel Serverless имеет cold start ~1-2 секунды при первом запросе

### Логи ошибок
Vercel Dashboard → Deployments → Function Logs

## Полезные команды

```bash
# Просмотр деплоев
vercel ls

# Просмотр логов
vercel logs [deployment-url]

# Переменные окружения
vercel env ls
vercel env add VARIABLE_NAME
```

## Лимиты бесплатного плана Vercel

- ✅ 100 GB bandwidth/месяц
- ✅ Serverless функции: 100 часов/месяц
- ✅ Таймаут: 10 секунд
- ✅ Неограниченное количество деплоев
- ✅ Custom домены: без лимита
- ✅ Автоматический SSL

## Контакты поддержки

- Документация: [vercel.com/docs](https://vercel.com/docs)
- Support: [vercel.com/support](https://vercel.com/support)
