# 🚀 Быстрый старт: Деплой на Vercel

## ✅ Что уже готово

Ваш проект подготовлен для деплоя на Vercel:
- ✓ `vercel.json` - конфигурация для Vercel
- ✓ `.env.example` - шаблон переменных окружения
- ✓ `.vercelignore` - исключения для деплоя
- ✓ Build скрипты настроены

## 📋 Пошаговая инструкция

### Шаг 1: Загрузите проект на GitHub

```bash
# Проверьте статус git
git status

# Добавьте все файлы
git add .

# Закоммитьте изменения
git commit -m "Ready for Vercel deployment"

# Создайте новый репозиторий на GitHub.com
# Затем добавьте remote и запушьте:
git remote add origin https://github.com/ваш-username/mood2movie.git
git push -u origin main
```

### Шаг 2: Деплой на Vercel

1. Откройте [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите **"New Project"**
4. Выберите репозиторий `mood2movie`
5. Vercel автоматически определит настройки:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist/public`

### Шаг 3: Добавьте переменные окружения

В разделе **Environment Variables** добавьте:

```
OPENROUTER_API_KEY = ваш_ключ_openrouter
KINOPOISK_API_KEY = ваш_ключ_kinopoisk  
SESSION_SECRET = любая_случайная_строка
```

**Где взять ключи:**
- OpenRouter: https://openrouter.ai/keys
- Kinopoisk: https://kinopoisk.dev

### Шаг 4: Деплой!

Нажмите **Deploy** и подождите 2-3 минуты.

### Шаг 5: Подключите домен mood2movie.ru

После успешного деплоя:

1. В Vercel: **Settings** → **Domains** → **Add**
2. Введите `mood2movie.ru`
3. Vercel покажет DNS записи

У вашего регистратора домена добавьте:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | 76.76.21.21 (IP из Vercel) |
| CNAME | www | cname.vercel-dns.com |

Подождите 5-30 минут. Готово! 🎉

## 🔄 Обновления

После первого деплоя все обновления автоматические:

```bash
git add .
git commit -m "Update"
git push
```

Vercel автоматически задеплоит изменения!

## 📞 Помощь

Подробная инструкция в `DEPLOYMENT.md`

---

**Важно:** Убедитесь, что все секретные ключи добавлены в Environment Variables в Vercel!
