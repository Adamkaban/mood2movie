import MoodButton from '../MoodButton';

export default function MoodButtonExample() {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 bg-background">
      <MoodButton
        emoji="😊"
        label="Весёлое"
        gradient="positive"
        onClick={() => console.log('Mood clicked: Весёлое')}
      />
      <MoodButton
        emoji="🔥"
        label="Энергичное"
        gradient="energetic"
        onClick={() => console.log('Mood clicked: Энергичное')}
      />
      <MoodButton
        emoji="🤔"
        label="Задумчивое"
        gradient="thoughtful"
        onClick={() => console.log('Mood clicked: Задумчивое')}
      />
      <MoodButton
        emoji="😢"
        label="Грустное"
        gradient="emotional"
        onClick={() => console.log('Mood clicked: Грустное')}
      />
    </div>
  );
}
