import ErrorMessage from '../ErrorMessage';

export default function ErrorMessageExample() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <ErrorMessage
        message="Не удалось загрузить данные. Проверьте подключение к интернету."
        onRetry={() => console.log('Retry clicked')}
      />
    </div>
  );
}
