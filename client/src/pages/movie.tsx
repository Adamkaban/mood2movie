import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Popcorn } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';

interface Movie {
  id: number;
  name: string;
  alternativeName?: string;
  year: number;
  poster?: {
    url: string;
  };
  rating?: {
    kp: number;
  };
  genres?: Array<{ name: string }>;
  description?: string;
  countries?: Array<{ name: string }>;
  movieLength?: number;
}

interface MovieResponse {
  movie: Movie;
  genres: string[];
}

export default function Movie() {
  const [, setLocation] = useLocation();
  const [currentMood, setCurrentMood] = useState<string>('');
  const [currentMovie, setCurrentMovie] = useState<MovieResponse | null>(null);
  
  // Load excluded IDs synchronously before first render
  const getExcludedIds = (): number[] => {
    const stored = sessionStorage.getItem('excludedMovieIds');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse excluded IDs:', e);
      }
    }
    return [];
  };

  const [excludedIds, setExcludedIds] = useState<number[]>(getExcludedIds());
  
  // Get mood from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mood = params.get('mood');
    if (mood) {
      setCurrentMood(mood);
    } else {
      setLocation('/');
    }
  }, [setLocation]);

  // Fetch movie recommendation (only runs once on mount)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/movie/recommend', currentMood],
    enabled: !!currentMood,
    retry: 1,
    queryFn: async () => {
      const response = await fetch('/api/movie/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: currentMood,
          excludeIds: excludedIds,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie');
      }
      
      const result = await response.json() as MovieResponse;
      
      // Save to excluded list immediately after fetch
      if (result.movie?.id && !excludedIds.includes(result.movie.id)) {
        const newExcludedIds = [...excludedIds, result.movie.id];
        setExcludedIds(newExcludedIds);
        sessionStorage.setItem('excludedMovieIds', JSON.stringify(newExcludedIds));
      }
      
      return result;
    },
  });

  // Update current movie when initial data loads
  useEffect(() => {
    if (data && !currentMovie) {
      setCurrentMovie(data);
    }
  }, [data, currentMovie]);

  // Mutation for getting another movie
  const getAnotherMovie = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/movie/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: currentMood,
          excludeIds: excludedIds,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie');
      }
      
      return response.json() as Promise<MovieResponse>;
    },
    onSuccess: (newData) => {
      // Update the displayed movie immediately
      setCurrentMovie(newData);
      // Save to excluded list
      if (newData.movie?.id) {
        const newExcludedIds = [...excludedIds, newData.movie.id];
        setExcludedIds(newExcludedIds);
        sessionStorage.setItem('excludedMovieIds', JSON.stringify(newExcludedIds));
      }
    },
  });

  const handleChangeMood = () => {
    // Clear excluded IDs when changing mood
    sessionStorage.removeItem('excludedMovieIds');
    setLocation('/');
  };

  const handleChangeMovie = () => {
    getAnotherMovie.mutate();
  };

  const handleWatch = () => {
    if (currentMovie?.movie?.id) {
      window.open(`https://www.kinopoisk.ru/film/${currentMovie.movie.id}/`, '_blank');
    }
  };

  const handleRetry = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="py-6 px-4">
          <div className="flex items-center justify-center gap-3">
            <Popcorn className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-white cursor-pointer" onClick={() => setLocation('/')} data-testid="text-logo">
              Mood2movie
            </h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center px-4">
          <ErrorMessage 
            message="Не удалось загрузить фильм. Проверьте подключение к интернету или попробуйте выбрать другое настроение." 
            onRetry={handleRetry} 
          />
        </div>
      </div>
    );
  }

  if (isLoading || !currentMovie || getAnotherMovie.isPending) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="py-6 px-4">
          <div className="flex items-center justify-center gap-3">
            <Popcorn className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-white cursor-pointer" onClick={() => setLocation('/')} data-testid="text-logo">
              Mood2movie
            </h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 px-4">
        <div className="flex items-center justify-center gap-3">
          <Popcorn className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-white cursor-pointer" onClick={() => setLocation('/')} data-testid="text-logo">
            Mood2movie
          </h1>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <MovieCard
          movie={currentMovie.movie}
          onChangeMovie={handleChangeMovie}
          onChangeMood={handleChangeMood}
          onWatch={handleWatch}
          isLoading={getAnotherMovie.isPending}
        />
      </div>
    </div>
  );
}
