import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

interface MovieCardProps {
  movie: Movie;
  onChangeMovie: () => void;
  onChangeMood: () => void;
  onWatch: () => void;
  isLoading?: boolean;
}

export default function MovieCard({ 
  movie, 
  onChangeMovie, 
  onChangeMood, 
  onWatch,
  isLoading = false 
}: MovieCardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 overflow-hidden"
        data-testid="card-movie"
      >
        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
          {movie.poster?.url && (
            <div className="w-full md:w-80 flex-shrink-0">
              <img
                src={movie.poster.url}
                alt={movie.name}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl"
                data-testid="img-poster"
              />
            </div>
          )}
          
          <div className="flex-1 space-y-4 md:space-y-6">
            <div>
              <h1 
                className="text-2xl md:text-3xl font-bold text-white mb-2"
                data-testid="text-title"
              >
                {movie.name}
              </h1>
              {movie.alternativeName && (
                <p className="text-zinc-400" data-testid="text-alternative-title">
                  {movie.alternativeName}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {movie.rating?.kp && (
                <div className="flex items-center gap-1" data-testid="text-rating">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <span className="text-lg font-semibold text-white">
                    {movie.rating.kp.toFixed(1)}
                  </span>
                </div>
              )}
              {movie.year && (
                <span className="text-zinc-400" data-testid="text-year">
                  {movie.year}
                </span>
              )}
              {movie.movieLength && (
                <span className="text-zinc-400" data-testid="text-duration">
                  {movie.movieLength} мин
                </span>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge 
                    key={genre.name} 
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                    data-testid={`badge-genre-${genre.name}`}
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {movie.description && (
              <p className="text-zinc-400 leading-relaxed line-clamp-4" data-testid="text-description">
                {movie.description}
              </p>
            )}

            {movie.countries && movie.countries.length > 0 && (
              <p className="text-sm text-zinc-500" data-testid="text-country">
                Страна: {movie.countries.map(c => c.name).join(', ')}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-800 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onChangeMood}
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-change-mood"
            >
              ← Сменить настроение
            </button>
            <button
              onClick={onChangeMovie}
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-another-movie"
            >
              🔄 Другой фильм
            </button>
            <button
              onClick={onWatch}
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors sm:ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-watch"
            >
              ▶ Смотреть фильм
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
