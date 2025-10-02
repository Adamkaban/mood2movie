import { useState } from 'react';
import { useLocation } from 'wouter';
import MovieCard from '@/components/MovieCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';

export default function Movie() {
  const [, setLocation] = useLocation();
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  // todo: remove mock functionality - this is mock data for the prototype
  const mockMovie = {
    id: 326,
    name: 'Побег из Шоушенка',
    alternativeName: 'The Shawshank Redemption',
    year: 1994,
    poster: {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1599028/0b76b2a0-d4c9-4f9b-b8ff-6f6a8e9b4c1e/orig'
    },
    rating: {
      kp: 9.1
    },
    genres: [
      { name: 'драма' }
    ],
    description: 'Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки. Каждый, кто попадает в эти стены, становится их рабом до конца жизни. Но Энди, вооружившись живым умом и доброй душой, отказывается мириться с приговором судьбы и начинает разрабатывать невероятно дерзкий план своего освобождения.',
    countries: [
      { name: 'США' }
    ],
    movieLength: 142
  };

  const handleChangeMood = () => {
    setLocation('/');
  };

  const handleChangeMovie = () => {
    console.log('Fetching another movie...');
    // todo: remove mock functionality - in real app, this would fetch a new movie
  };

  const handleWatch = () => {
    console.log('Opening movie link...');
    // todo: remove mock functionality - in real app, this would open kinopoisk link
    window.open(`https://www.kinopoisk.ru/film/${mockMovie.id}/`, '_blank');
  };

  const handleRetry = () => {
    console.log('Retrying...');
    // todo: remove mock functionality - in real app, this would retry the API call
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <MovieCard
        movie={mockMovie}
        onChangeMovie={handleChangeMovie}
        onChangeMood={handleChangeMood}
        onWatch={handleWatch}
        isLoading={isLoading}
      />
    </div>
  );
}
