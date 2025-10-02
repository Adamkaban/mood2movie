import MovieCard from '../MovieCard';

export default function MovieCardExample() {
  const mockMovie = {
    id: 1,
    name: 'Зелёная миля',
    alternativeName: 'The Green Mile',
    year: 1999,
    poster: {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1777765/2bb2a86e-8d22-476b-98b9-2e662aed7a30/orig'
    },
    rating: {
      kp: 9.1
    },
    genres: [
      { name: 'драма' },
      { name: 'фэнтези' },
      { name: 'криминал' }
    ],
    description: 'Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зелёную милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.',
    countries: [
      { name: 'США' }
    ],
    movieLength: 189
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <MovieCard
        movie={mockMovie}
        onChangeMovie={() => console.log('Change movie')}
        onChangeMood={() => console.log('Change mood')}
        onWatch={() => console.log('Watch movie')}
      />
    </div>
  );
}
