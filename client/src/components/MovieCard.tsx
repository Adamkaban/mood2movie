import { Star, User, DollarSign, Calendar, Award, TrendingUp, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Movie {
  id: number;
  name: string;
  alternativeName?: string;
  enName?: string;
  year: number;
  description?: string;
  shortDescription?: string;
  slogan?: string;
  type?: string;
  status?: string;
  
  poster?: {
    url: string;
  };
  backdrop?: {
    url?: string;
  };
  
  rating?: {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
  };
  votes?: {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
  };
  
  movieLength?: number;
  ratingMpaa?: string;
  ageRating?: number;
  
  genres?: Array<{ name: string }>;
  countries?: Array<{ name: string }>;
  persons?: Array<{
    id: number;
    name?: string;
    photo?: string;
    profession?: string;
  }>;
  
  budget?: {
    value?: number;
    currency?: string;
  };
  fees?: {
    world?: {
      value?: number;
      currency?: string;
    };
    russia?: {
      value?: number;
      currency?: string;
    };
    usa?: {
      value?: number;
      currency?: string;
    };
  };
  
  premiere?: {
    world?: string;
    russia?: string;
    digital?: string;
  };
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
  const formatMoney = (value?: number, currency?: string) => {
    if (!value) return null;
    const formatted = new Intl.NumberFormat('ru-RU').format(value);
    return `${formatted} ${currency || '$'}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const directors = movie.persons?.filter(p => p.profession === 'режиссеры') || [];
  const actors = movie.persons?.filter(p => p.profession === 'актеры').slice(0, 10) || [];
  const writers = movie.persons?.filter(p => p.profession === 'сценаристы') || [];
  const producers = movie.persons?.filter(p => p.profession === 'продюсеры') || [];
  const composers = movie.persons?.filter(p => p.profession === 'композиторы') || [];
  const operators = movie.persons?.filter(p => p.profession === 'операторы') || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div 
        className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 overflow-hidden relative"
        data-testid="card-movie"
      >
        {movie.backdrop?.url && (
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url(${movie.backdrop.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)'
            }}
            data-testid="img-backdrop"
          />
        )}
        <div className="flex flex-col lg:flex-row gap-6 p-6 md:p-8 relative z-10">
          {movie.poster?.url && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <img
                src={movie.poster.url}
                alt={movie.name}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl"
                data-testid="img-poster"
              />
            </div>
          )}
          
          <div className="flex-1 space-y-5">
            <div>
              <h1 
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                data-testid="text-title"
              >
                {movie.name}
              </h1>
              {movie.alternativeName && (
                <p className="text-lg text-zinc-400 mb-1" data-testid="text-alternative-title">
                  {movie.alternativeName}
                </p>
              )}
              {movie.enName && movie.enName !== movie.alternativeName && (
                <p className="text-sm text-zinc-500" data-testid="text-en-name">
                  {movie.enName}
                </p>
              )}
              <div className="flex gap-2 flex-wrap mt-2">
                {movie.type && (
                  <Badge variant="outline" className="border-zinc-700" data-testid="badge-type">
                    {movie.type}
                  </Badge>
                )}
                {movie.status && (
                  <Badge variant="secondary" className="bg-zinc-800" data-testid="badge-status">
                    {movie.status}
                  </Badge>
                )}
              </div>
              {movie.slogan && (
                <p className="text-sm italic text-zinc-500 mt-2" data-testid="text-slogan">
                  «{movie.slogan}»
                </p>
              )}
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              {movie.rating?.kp && (
                <div className="flex items-center gap-2" data-testid="rating-kp">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">
                      {movie.rating.kp.toFixed(1)}
                    </span>
                    {movie.votes?.kp && (
                      <span className="text-xs text-zinc-500">
                        {new Intl.NumberFormat('ru-RU').format(movie.votes.kp)} голосов
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {movie.rating?.imdb && (
                <div className="flex items-center gap-2" data-testid="rating-imdb">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      IMDb {movie.rating.imdb.toFixed(1)}
                    </span>
                    {movie.votes?.imdb && (
                      <span className="text-xs text-zinc-500">
                        {new Intl.NumberFormat('ru-RU').format(movie.votes.imdb)} голосов
                      </span>
                    )}
                  </div>
                </div>
              )}

              {movie.rating?.tmdb && (
                <div className="flex items-center gap-2" data-testid="rating-tmdb">
                  <Star className="w-4 h-4 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">
                      TMDB {movie.rating.tmdb.toFixed(1)}
                    </span>
                    {movie.votes?.tmdb && (
                      <span className="text-xs text-zinc-500">
                        {new Intl.NumberFormat('ru-RU').format(movie.votes.tmdb)}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {movie.rating?.filmCritics && (
                <div className="flex items-center gap-2" data-testid="rating-critics">
                  <Award className="w-4 h-4 text-purple-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">
                      Критики {movie.rating.filmCritics.toFixed(1)}
                    </span>
                    {movie.votes?.filmCritics && (
                      <span className="text-xs text-zinc-500">
                        {new Intl.NumberFormat('ru-RU').format(movie.votes.filmCritics)}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {movie.rating?.russianFilmCritics && (
                <div className="flex items-center gap-2" data-testid="rating-russian-critics">
                  <Award className="w-4 h-4 text-red-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">
                      РФ критики {movie.rating.russianFilmCritics.toFixed(1)}
                    </span>
                    {movie.votes?.russianFilmCritics && (
                      <span className="text-xs text-zinc-500">
                        {new Intl.NumberFormat('ru-RU').format(movie.votes.russianFilmCritics)}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {movie.rating?.await && (
                <div className="flex items-center gap-2" data-testid="rating-await">
                  <Star className="w-4 h-4 text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">
                      Ожидание {movie.rating.await.toFixed(1)}
                    </span>
                    {movie.votes?.await && (
                      <span className="text-xs text-zinc-500">
                        {new Intl.NumberFormat('ru-RU').format(movie.votes.await)}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {movie.ageRating && (
                <Badge variant="outline" className="border-zinc-700" data-testid="badge-age-rating">
                  {movie.ageRating}+
                </Badge>
              )}
              {movie.ratingMpaa && (
                <Badge variant="outline" className="border-zinc-700" data-testid="badge-rating-mpaa">
                  {movie.ratingMpaa}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 flex-wrap text-sm">
              {movie.year && (
                <span className="flex items-center gap-1 text-zinc-400" data-testid="text-year">
                  <Calendar className="w-4 h-4" />
                  {movie.year}
                </span>
              )}
              {movie.movieLength && (
                <span className="flex items-center gap-1 text-zinc-400" data-testid="text-duration">
                  <Clock className="w-4 h-4" />
                  {movie.movieLength} мин
                </span>
              )}
              {movie.countries && movie.countries.length > 0 && (
                <span className="flex items-center gap-1 text-zinc-400" data-testid="text-country">
                  <MapPin className="w-4 h-4" />
                  {movie.countries.map(c => c.name).join(', ')}
                </span>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge 
                    key={genre.name} 
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    data-testid={`badge-genre-${genre.name}`}
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {(movie.description || movie.shortDescription) && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-300">Описание</h3>
                {movie.description && (
                  <p className="text-zinc-400 leading-relaxed" data-testid="text-description">
                    {movie.description}
                  </p>
                )}
                {movie.shortDescription && movie.shortDescription !== movie.description && (
                  <p className="text-sm text-zinc-500 italic" data-testid="text-short-description">
                    {movie.shortDescription}
                  </p>
                )}
              </div>
            )}

            {directors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Режиссёр
                </h3>
                <p className="text-zinc-400" data-testid="text-directors">
                  {directors.map(d => d.name).join(', ')}
                </p>
              </div>
            )}

            {actors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-300">В ролях</h3>
                <div className="flex flex-wrap gap-2">
                  {actors.map((actor, idx) => (
                    <span key={actor.id} className="text-sm text-zinc-400" data-testid={`text-actor-${idx}`}>
                      {actor.name}{idx < actors.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {writers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-300">Сценарий</h3>
                <p className="text-sm text-zinc-400" data-testid="text-writers">
                  {writers.map(w => w.name).join(', ')}
                </p>
              </div>
            )}

            {producers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-300">Продюсеры</h3>
                <p className="text-sm text-zinc-400" data-testid="text-producers">
                  {producers.map(p => p.name).join(', ')}
                </p>
              </div>
            )}

            {composers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-300">Музыка</h3>
                <p className="text-sm text-zinc-400" data-testid="text-composers">
                  {composers.map(c => c.name).join(', ')}
                </p>
              </div>
            )}

            {operators.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-300">Оператор</h3>
                <p className="text-sm text-zinc-400" data-testid="text-operators">
                  {operators.map(o => o.name).join(', ')}
                </p>
              </div>
            )}

            {(movie.budget?.value || movie.fees?.world?.value || movie.fees?.russia?.value || movie.fees?.usa?.value) && (
              <>
                <Separator className="bg-zinc-800" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {movie.budget?.value && (
                    <div className="flex items-center gap-2" data-testid="text-budget">
                      <DollarSign className="w-4 h-4 text-zinc-500" />
                      <div className="flex flex-col">
                        <span className="text-zinc-500">Бюджет</span>
                        <span className="text-zinc-300 font-medium">
                          {formatMoney(movie.budget.value, movie.budget.currency)}
                        </span>
                      </div>
                    </div>
                  )}
                  {movie.fees?.world?.value && (
                    <div className="flex items-center gap-2" data-testid="text-fees-world">
                      <TrendingUp className="w-4 h-4 text-zinc-500" />
                      <div className="flex flex-col">
                        <span className="text-zinc-500">Сборы в мире</span>
                        <span className="text-zinc-300 font-medium">
                          {formatMoney(movie.fees.world.value, movie.fees.world.currency)}
                        </span>
                      </div>
                    </div>
                  )}
                  {movie.fees?.russia?.value && (
                    <div className="flex items-center gap-2" data-testid="text-fees-russia">
                      <TrendingUp className="w-4 h-4 text-zinc-500" />
                      <div className="flex flex-col">
                        <span className="text-zinc-500">Сборы в России</span>
                        <span className="text-zinc-300 font-medium">
                          {formatMoney(movie.fees.russia.value, movie.fees.russia.currency)}
                        </span>
                      </div>
                    </div>
                  )}
                  {movie.fees?.usa?.value && (
                    <div className="flex items-center gap-2" data-testid="text-fees-usa">
                      <TrendingUp className="w-4 h-4 text-zinc-500" />
                      <div className="flex flex-col">
                        <span className="text-zinc-500">Сборы в США</span>
                        <span className="text-zinc-300 font-medium">
                          {formatMoney(movie.fees.usa.value, movie.fees.usa.currency)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {(movie.premiere?.world || movie.premiere?.russia || movie.premiere?.digital) && (
              <>
                <Separator className="bg-zinc-800" />
                <div className="space-y-2 text-sm">
                  <h3 className="text-zinc-300 font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Премьера
                  </h3>
                  <div className="space-y-1">
                    {movie.premiere.world && (
                      <p className="text-zinc-400" data-testid="text-premiere-world">
                        В мире: {formatDate(movie.premiere.world)}
                      </p>
                    )}
                    {movie.premiere.russia && (
                      <p className="text-zinc-400" data-testid="text-premiere-russia">
                        В России: {formatDate(movie.premiere.russia)}
                      </p>
                    )}
                    {movie.premiere.digital && (
                      <p className="text-zinc-400" data-testid="text-premiere-digital">
                        Цифровая: {formatDate(movie.premiere.digital)}
                      </p>
                    )}
                  </div>
                </div>
              </>
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
