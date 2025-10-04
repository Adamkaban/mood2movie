import { useLocation } from 'wouter';
import { Popcorn } from 'lucide-react';
import MoodGrid from '@/components/MoodGrid';
import { usePageMeta } from '@/hooks/usePageMeta';
import { WebsiteStructuredData } from '@/components/StructuredData';

export default function Home() {
  const [, setLocation] = useLocation();

  usePageMeta({
    title: 'Mood2movie - Подбор фильмов по настроению с помощью ИИ | Выбрать кино на вечер',
    description: 'Не знаете, какой фильм посмотреть? Mood2movie поможет выбрать идеальное кино на вечер под ваше настроение. Искусственный интеллект подберет лучшие фильмы с Кинопоиска за секунды!',
    keywords: 'подбор фильмов, кино под настроение, выбрать фильм, что посмотреть, фильмы по настроению, кино на вечер, подбор кино онлайн, рекомендации фильмов'
  });

  const handleMoodSelect = (mood: string) => {
    const moodSlug = mood.toLowerCase();
    setLocation(`/mood/${encodeURIComponent(moodSlug)}`);
  };

  return (
    <>
      <WebsiteStructuredData />
      <div className="bg-background flex flex-col">
        <div className="flex flex-col items-center justify-center px-4 py-12 md:py-16">
          <div className="w-full max-w-6xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Popcorn className="w-12 h-12 md:w-16 md:h-16 text-indigo-500" />
                <h1 className="text-5xl md:text-6xl font-bold text-white" data-testid="text-logo">
                  Mood2movie
                </h1>
              </div>
              <p className="text-lg md:text-xl text-zinc-400">
                Выберите своё настроение, и мы подберём идеальный фильм
              </p>
            </div>

            <MoodGrid onMoodSelect={handleMoodSelect} />

            <div className="max-w-3xl mx-auto text-center space-y-4 px-4">
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                Не знаете, <strong className="text-white">какой фильм посмотреть</strong> сегодня? Наш сервис поможет <strong className="text-white">выбрать кино на вечер</strong>, которое идеально подходит под ваше текущее настроение. Искусственный интеллект анализирует ваши эмоции и подбирает фильмы, которые вы захотите посмотреть прямо сейчас.
              </p>
              
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                Хотите посмотреть <strong className="text-white">кино под настроение</strong>? Просто выберите, как вы себя чувствуете — весело, грустно, романтично или энергично. Наша подборка фильмов учитывает ваше эмоциональное состояние и предлагает <strong className="text-white">лучшие фильмы</strong> из базы Кинопоиска с высоким рейтингом.
              </p>
              
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                <strong className="text-white">Подбор кино по настроению</strong> — это быстро и удобно. Забудьте о долгих поисках! Каждая рекомендация персонализирована: если фильм не подошёл, просто запросите другой вариант. Откройте для себя новые фильмы и наслаждайтесь просмотром!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
