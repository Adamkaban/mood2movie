import { Film } from 'lucide-react';

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]" data-testid="loading-container">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full" />
        <Film className="w-20 h-20 text-indigo-500 animate-spin relative" style={{ animationDuration: '3s' }} data-testid="icon-loading" />
      </div>
      
      <p className="text-zinc-300 text-2xl font-medium animate-pulse" data-testid="text-loading">
        Подбираем фильм под ваше настроение
        <span className="loading-dots"></span>
      </p>
    </div>
  );
}
