import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizHeader = ({ 
  currentQuestion, 
  totalQuestions, 
  timeRemaining, 
  quizTitle,
  onMenuToggle,
  showTimer = true 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-card border-b border-border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-clinical"
          >
            <Icon name="Menu" size={20} className="text-muted-foreground" />
          </button>
          <div>
            <h1 className="font-heading font-semibold text-lg text-foreground">
              {quizTitle}
            </h1>
            <p className="font-caption text-sm text-muted-foreground">
              Pertanyaan {currentQuestion} dari {totalQuestions}
            </p>
          </div>
        </div>
        
        {showTimer && timeRemaining > 0 && (
          <div className="flex items-center space-x-2 bg-warning/10 text-warning px-3 py-2 rounded-lg">
            <Icon name="Clock" size={16} />
            <span className="font-mono font-medium text-sm">
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-caption text-xs text-muted-foreground">
            Progress
          </span>
          <span className="font-caption text-xs font-medium text-foreground">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;