import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizSidebar = ({ 
  questions, 
  currentQuestion, 
  answers, 
  flaggedQuestions, 
  onQuestionSelect, 
  onToggleFlag,
  isOpen,
  onClose 
}) => {
  const getQuestionStatus = (questionIndex) => {
    const questionId = questions[questionIndex]?.id;
    const hasAnswer = answers[questionId] !== undefined && answers[questionId] !== null;
    const isFlagged = flaggedQuestions.includes(questionId);
    const isCurrent = questionIndex + 1 === currentQuestion;

    if (isCurrent) return 'current';
    if (hasAnswer) return 'answered';
    if (isFlagged) return 'flagged';
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'answered':
        return 'bg-success text-success-foreground border-success';
      case 'flagged':
        return 'bg-warning text-warning-foreground border-warning';
      default:
        return 'bg-muted text-muted-foreground border-border hover:border-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current':
        return 'Play';
      case 'answered':
        return 'Check';
      case 'flagged':
        return 'Flag';
      default:
        return null;
    }
  };

  const answeredCount = questions.filter((_, index) => {
    const questionId = questions[index]?.id;
    return answers[questionId] !== undefined && answers[questionId] !== null;
  }).length;

  const flaggedCount = flaggedQuestions.length;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 right-0 h-full w-80 bg-card border-l border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Navigasi Soal
            </h3>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-clinical"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <div className="font-heading font-semibold text-lg text-foreground">
                {answeredCount}
              </div>
              <div className="font-caption text-xs text-muted-foreground">
                Terjawab
              </div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <div className="font-heading font-semibold text-lg text-foreground">
                {flaggedCount}
              </div>
              <div className="font-caption text-xs text-muted-foreground">
                Ditandai
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-6 space-y-2">
            <h4 className="font-body font-medium text-sm text-foreground mb-3">
              Keterangan:
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded border border-primary" />
                <span className="font-caption text-muted-foreground">Soal saat ini</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded border border-success" />
                <span className="font-caption text-muted-foreground">Sudah dijawab</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded border border-warning" />
                <span className="font-caption text-muted-foreground">Ditandai untuk review</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-muted rounded border border-border" />
                <span className="font-caption text-muted-foreground">Belum dijawab</span>
              </div>
            </div>
          </div>

          {/* Question Grid */}
          <div className="space-y-4">
            <h4 className="font-body font-medium text-sm text-foreground">
              Daftar Soal:
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question, index) => {
                const status = getQuestionStatus(index);
                const statusIcon = getStatusIcon(status);
                
                return (
                  <button
                    key={question.id}
                    onClick={() => {
                      onQuestionSelect(index + 1);
                      onClose();
                    }}
                    className={`
                      relative w-12 h-12 rounded-lg border-2 transition-clinical
                      flex items-center justify-center
                      ${getStatusColor(status)}
                    `}
                  >
                    <span className="font-body font-medium text-sm">
                      {index + 1}
                    </span>
                    {statusIcon && (
                      <Icon 
                        name={statusIcon} 
                        size={12} 
                        className="absolute -top-1 -right-1 bg-card rounded-full p-0.5" 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const currentQuestionId = questions[currentQuestion - 1]?.id;
                if (currentQuestionId) {
                  onToggleFlag(currentQuestionId);
                }
              }}
              iconName="Flag"
              iconPosition="left"
              className="w-full"
            >
              {flaggedQuestions.includes(questions[currentQuestion - 1]?.id) 
                ? 'Hapus Tanda' :'Tandai Soal'
              }
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Find next unanswered question
                const nextUnanswered = questions.findIndex((q, index) => {
                  return answers[q.id] === undefined || answers[q.id] === null;
                });
                if (nextUnanswered !== -1) {
                  onQuestionSelect(nextUnanswered + 1);
                  onClose();
                }
              }}
              iconName="SkipForward"
              iconPosition="left"
              className="w-full"
            >
              Soal Belum Dijawab
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizSidebar;