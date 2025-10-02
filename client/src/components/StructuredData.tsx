import { useEffect } from 'react';

interface WebsiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  potentialAction?: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}

export function WebsiteStructuredData() {
  useEffect(() => {
    const schema: WebsiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Mood2movie',
      url: 'https://mood2movie.replit.app',
      description: 'Сервис подбора фильмов по настроению с помощью искусственного интеллекта',
      inLanguage: 'ru-RU',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://mood2movie.replit.app/movie?mood={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'website-schema';
    
    const existingScript = document.getElementById('website-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('website-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
}

interface MovieSchema {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  datePublished?: string;
  genre?: string[];
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    bestRating: number;
  };
}

interface MovieStructuredDataProps {
  movie: {
    name: string;
    description?: string;
    year?: number;
    genres?: Array<{ name: string }>;
    rating?: { kp?: number };
  };
}

export function MovieStructuredData({ movie }: MovieStructuredDataProps) {
  useEffect(() => {
    const schema: MovieSchema = {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      name: movie.name,
      description: movie.description,
      datePublished: movie.year?.toString(),
      genre: movie.genres?.map(g => g.name)
    };

    if (movie.rating?.kp) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: movie.rating.kp,
        bestRating: 10
      };
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'movie-schema';
    
    const existingScript = document.getElementById('movie-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('movie-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [movie]);

  return null;
}
