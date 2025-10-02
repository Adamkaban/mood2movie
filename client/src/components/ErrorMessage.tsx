import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2" data-testid="text-error-title">
          Упс, что-то пошло не так
        </h3>
        <p className="text-red-200 mb-6" data-testid="text-error-message">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
          data-testid="button-retry"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
