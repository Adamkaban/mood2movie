import { useLocation } from 'wouter';
import { Film } from 'lucide-react';
import MoodGrid from '@/components/MoodGrid';

export default function Home() {
  const [, setLocation] = useLocation();

  const handleMoodSelect = (mood: string) => {
    setLocation(`/movie?mood=${encodeURIComponent(mood)}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-6xl mx-auto space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Film className="w-12 h-12 md:w-16 md:h-16 text-indigo-500" />
              <h1 className="text-5xl md:text-6xl font-bold text-white" data-testid="text-logo">
                mood2movie
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-400">
              Выберите своё настроение, и мы подберём идеальный фильм
            </p>
          </div>

          <MoodGrid onMoodSelect={handleMoodSelect} />
        </div>
      </div>

      <footer className="py-6 text-center text-zinc-500 text-sm">
        <p>Powered by AI • Данные из Кинопоиска</p>
      </footer>
    </div>
  );
}
