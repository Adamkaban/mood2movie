import MoodGrid from '../MoodGrid';

export default function MoodGridExample() {
  return (
    <div className="min-h-screen bg-background p-8">
      <MoodGrid onMoodSelect={(mood) => console.log('Selected mood:', mood)} />
    </div>
  );
}
