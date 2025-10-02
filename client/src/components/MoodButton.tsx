interface MoodButtonProps {
  emoji: string;
  label: string;
  gradient: 'positive' | 'energetic' | 'thoughtful' | 'emotional' | 'special';
  onClick: () => void;
}

export default function MoodButton({ emoji, label, gradient, onClick }: MoodButtonProps) {
  const gradientClasses = {
    positive: 'bg-gradient-positive',
    energetic: 'bg-gradient-energetic',
    thoughtful: 'bg-gradient-thoughtful',
    emotional: 'bg-gradient-emotional',
    special: 'bg-gradient-special',
  };

  return (
    <button
      onClick={onClick}
      data-testid={`button-mood-${label.toLowerCase()}`}
      className={`
        ${gradientClasses[gradient]}
        h-14 md:h-16 w-full
        rounded-xl
        flex items-center justify-start gap-3
        px-4
        text-white font-semibold text-sm md:text-base
        transition-all duration-200
        hover:scale-105 hover:shadow-lg
        active:scale-100
      `}
    >
      <span className="text-2xl">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
