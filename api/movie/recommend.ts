import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const KINOPOISK_API_KEY = process.env.KINOPOISK_API_KEY;

// Map Russian genre names to Kinopoisk API format
const genreMapping: Record<string, string> = {
  'комедия': 'комедия',
  'драма': 'драма',
  'триллер': 'триллер',
  'мелодрама': 'мелодрама',
  'фантастика': 'фантастика',
  'боевик': 'боевик',
  'ужасы': 'ужасы',
  'приключения': 'приключения',
  'фэнтези': 'фэнтези',
  'детектив': 'детектив',
  'аниме': 'аниме',
  'документальный': 'документальный',
  'военный': 'военный',
  'вестерн': 'вестерн',
  'биография': 'биография',
  'история': 'история',
  'криминал': 'криминал',
  'мюзикл': 'мюзикл',
  'спорт': 'спорт',
  'семейный': 'семейный',
};

const moodRequestSchema = z.object({
  mood: z.string(),
  excludeIds: z.array(z.number()).optional(),
});

async function analyzeMood(mood: string): Promise<string[]> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://mood2movie.ru',
        'X-Title': 'Mood2movie',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'system',
            content: 'Ты эксперт по подбору фильмов. Отвечай ТОЛЬКО списком жанров через запятую на русском языке, без дополнительных объяснений. Доступные жанры: комедия, драма, триллер, мелодрама, фантастика, боевик, ужасы, приключения, фэнтези, детектив, аниме, документальный, военный, вестерн, биография, история, криминал, мюзикл, спорт, семейный.'
          },
          {
            role: 'user',
            content: `Настроение: ${mood}. Порекомендуй 2-3 жанра фильмов, которые подойдут под это настроение. Ответь ТОЛЬКО жанрами через запятую.`
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    // Extract genres from the response
    const genres = content
      .toLowerCase()
      .split(',')
      .map((g: string) => g.trim())
      .filter((g: string) => g in genreMapping)
      .slice(0, 3);

    return genres.length > 0 ? genres : ['драма', 'комедия'];
  } catch (error) {
    console.error('Error analyzing mood:', error);
    // Fallback genres
    return ['драма', 'комедия'];
  }
}

async function getRandomMovie(genres: string[], excludeIds: number[] = []): Promise<any> {
  try {
    // Build genre filter with URL encoding
    const genreParams = genres.map(g => `genres.name=${encodeURIComponent(g)}`).join('&');
    
    // Build exclusion filter - use %21 for ! (URL encoded)
    const excludeParams = excludeIds.length > 0 
      ? `&${excludeIds.map(id => `id=%21${id}`).join('&')}`
      : '';
    
    const url = `https://api.kinopoisk.dev/v1.4/movie/random?${genreParams}&rating.kp=6-10&limit=1&notNullFields=name&notNullFields=poster.url${excludeParams}`;
    
    console.log('Fetching movie with URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'X-API-KEY': KINOPOISK_API_KEY!,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Kinopoisk API error:', response.status, errorText);
      throw new Error(`Kinopoisk API error: ${response.statusText}`);
    }

    const movie = await response.json();
    
    if (!movie || !movie.id) {
      throw new Error('No movie found');
    }

    return movie;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS (without credentials to allow wildcard origin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate environment variables
  if (!OPENROUTER_API_KEY) {
    console.error('OPENROUTER_API_KEY is not set');
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'OPENROUTER_API_KEY environment variable is not configured'
    });
  }

  if (!KINOPOISK_API_KEY) {
    console.error('KINOPOISK_API_KEY is not set');
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'KINOPOISK_API_KEY environment variable is not configured'
    });
  }

  try {
    const validation = moodRequestSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const { mood, excludeIds = [] } = validation.data;

    // Analyze mood and get genre recommendations
    const genres = await analyzeMood(mood);
    
    // Get random movie based on genres
    const movie = await getRandomMovie(genres, excludeIds);

    res.status(200).json({
      movie,
      genres,
    });
  } catch (error) {
    console.error('Error in /api/movie/recommend:', error);
    res.status(500).json({ 
      error: 'Failed to get movie recommendation',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
