import React from 'react';

import Button from '../../../components/ui/Button';

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onSubmit,
  canGoNext = true,
  isLastQuestion = false,
  isSubmitted = false 
}) => {
  return (
    <div className="bg-card border-t border-border p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 1 || isSubmitted}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Sebelumnya
        </Button>

        <div className="flex items-center space-x-2">
          <span className="font-caption text-sm text-muted-foreground">
            {currentQuestion} / {totalQuestions}
          </span>
        </div>

        {isLastQuestion ? (
          <Button
            variant="default"
            onClick={onSubmit}
            disabled={!canGoNext || isSubmitted}
            iconName="Check"
            iconPosition="right"
            className="bg-success hover:bg-success/90 text-success-foreground"
          >
            Selesai
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={onNext}
            disabled={!canGoNext || isSubmitted}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Selanjutnya
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizNavigation;