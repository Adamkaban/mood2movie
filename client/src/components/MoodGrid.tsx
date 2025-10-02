import MoodButton from './MoodButton';

interface Mood {
  emoji: string;
  label: string;
  gradient: 'positive' | 'energetic' | 'thoughtful' | 'emotional' | 'special';
}

const moods: Mood[] = [
  { emoji: '😊', label: 'Весёлое', gradient: 'positive' },
  { emoji: '🤣', label: 'Смешное', gradient: 'positive' },
  { emoji: '😌', label: 'Спокойное', gradient: 'positive' },
  { emoji: '❤️', label: 'Романтичное', gradient: 'positive' },
  { emoji: '🥰', label: 'Влюблённое', gradient: 'positive' },
  { emoji: '🤗', label: 'Тёплое', gradient: 'positive' },
  { emoji: '✨', label: 'Вдохновлённое', gradient: 'positive' },
  { emoji: '🎉', label: 'Праздничное', gradient: 'positive' },
  
  { emoji: '🔥', label: 'Энергичное', gradient: 'energetic' },
  { emoji: '💪', label: 'Мотивированное', gradient: 'energetic' },
  { emoji: '🚀', label: 'Амбициозное', gradient: 'energetic' },
  { emoji: '⚡', label: 'Драйвовое', gradient: 'energetic' },
  
  { emoji: '🤔', label: 'Задумчивое', gradient: 'thoughtful' },
  { emoji: '🧠', label: 'Философское', gradient: 'thoughtful' },
  { emoji: '🎭', label: 'Драматичное', gradient: 'thoughtful' },
  { emoji: '📚', label: 'Познавательное', gradient: 'thoughtful' },
  
  { emoji: '😢', label: 'Грустное', gradient: 'emotional' },
  { emoji: '😨', label: 'Напряжённое', gradient: 'emotional' },
  { emoji: '😰', label: 'Тревожное', gradient: 'emotional' },
  { emoji: '🥺', label: 'Ностальгическое', gradient: 'emotional' },
  { emoji: '😤', label: 'Раздражённое', gradient: 'emotional' },
  
  { emoji: '😴', label: 'Сонное', gradient: 'special' },
  { emoji: '🤪', label: 'Безумное', gradient: 'special' },
  { emoji: '🧘', label: 'Медитативное', gradient: 'special' },
  { emoji: '🎲', label: 'Случайное', gradient: 'special' },
];

interface MoodGridProps {
  onMoodSelect: (mood: string) => void;
}

export default function MoodGrid({ onMoodSelect }: MoodGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {moods.map((mood) => (
        <MoodButton
          key={mood.label}
          emoji={mood.emoji}
          label={mood.label}
          gradient={mood.gradient}
          onClick={() => onMoodSelect(mood.label)}
        />
      ))}
    </div>
  );
}
