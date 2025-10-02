export default function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="w-full aspect-[2/3] bg-zinc-800/50 rounded-lg" />
          </div>
          
          <div className="flex-1 space-y-4 md:space-y-6">
            <div>
              <div className="h-8 bg-zinc-800/50 rounded w-3/4 mb-2" />
              <div className="h-5 bg-zinc-800/50 rounded w-1/2" />
            </div>

            <div className="flex items-center gap-4">
              <div className="h-6 bg-zinc-800/50 rounded w-16" />
              <div className="h-6 bg-zinc-800/50 rounded w-12" />
              <div className="h-6 bg-zinc-800/50 rounded w-20" />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="h-7 bg-zinc-800/50 rounded w-20" />
              <div className="h-7 bg-zinc-800/50 rounded w-24" />
              <div className="h-7 bg-zinc-800/50 rounded w-16" />
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-zinc-800/50 rounded w-full" />
              <div className="h-4 bg-zinc-800/50 rounded w-full" />
              <div className="h-4 bg-zinc-800/50 rounded w-3/4" />
            </div>

            <div className="h-4 bg-zinc-800/50 rounded w-1/3" />
          </div>
        </div>

        <div className="border-t border-zinc-800 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-12 bg-zinc-800/50 rounded-lg flex-1" />
            <div className="h-12 bg-zinc-800/50 rounded-lg flex-1" />
            <div className="h-12 bg-zinc-800/50 rounded-lg flex-1" />
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-zinc-400 text-lg" data-testid="text-loading">
          Подбираем фильм под ваше настроение...
        </p>
      </div>
    </div>
  );
}
