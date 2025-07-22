import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizResults = ({ 
  score, 
  totalQuestions, 
  timeSpent, 
  subjectAnalysis, 
  recommendations,
  onRetakeQuiz,
  onViewReview,
  onBackToDashboard 
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success/10 border-success/20';
    if (percentage >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent! Pemahaman Anda sangat baik.';
    if (percentage >= 60) return 'Good! Masih ada ruang untuk perbaikan.';
    return 'Perlu lebih banyak latihan dan review materi.';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} menit ${secs} detik`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Trophy" size={40} className="text-primary" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
            Kuis Selesai!
          </h1>
          <p className="font-body text-muted-foreground">
            Berikut adalah hasil dan analisis performa Anda
          </p>
        </div>
      </div>

      {/* Score Card */}
      <div className={`bg-card border-2 rounded-xl p-6 text-center ${getScoreBgColor(percentage)}`}>
        <div className="space-y-4">
          <div>
            <div className={`font-heading font-bold text-5xl ${getScoreColor(percentage)}`}>
              {percentage}%
            </div>
            <div className="font-body text-lg text-foreground mt-2">
              {score} dari {totalQuestions} soal benar
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                percentage >= 80 ? 'bg-success' : 
                percentage >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <p className="font-body text-sm text-muted-foreground">
            {getPerformanceMessage(percentage)}
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="Clock" size={24} className="mx-auto text-primary mb-2" />
          <div className="font-heading font-semibold text-lg text-foreground">
            {formatTime(timeSpent)}
          </div>
          <div className="font-caption text-sm text-muted-foreground">
            Waktu Pengerjaan
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="Target" size={24} className="mx-auto text-success mb-2" />
          <div className="font-heading font-semibold text-lg text-foreground">
            {Math.round((timeSpent / totalQuestions) / 60 * 10) / 10} min
          </div>
          <div className="font-caption text-sm text-muted-foreground">
            Rata-rata per Soal
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="TrendingUp" size={24} className="mx-auto text-accent mb-2" />
          <div className="font-heading font-semibold text-lg text-foreground">
            {percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : 'C'}
          </div>
          <div className="font-caption text-sm text-muted-foreground">
            Grade
          </div>
        </div>
      </div>

      {/* Subject Analysis */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Analisis per Topik
        </h3>
        
        <div className="space-y-4">
          {subjectAnalysis.map((subject) => (
            <div key={subject.topic} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body font-medium text-sm text-foreground">
                  {subject.topic}
                </span>
                <span className="font-caption text-sm text-muted-foreground">
                  {subject.correct}/{subject.total} ({Math.round((subject.correct/subject.total)*100)}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    (subject.correct/subject.total) >= 0.8 ? 'bg-success' : 
                    (subject.correct/subject.total) >= 0.6 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${(subject.correct/subject.total)*100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center">
          <Icon name="Lightbulb" size={20} className="mr-2 text-accent" />
          Rekomendasi Belajar
        </h3>
        
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={16} className="text-accent mt-0.5" />
              <p className="font-body text-sm text-foreground">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          onClick={onViewReview}
          iconName="Eye"
          iconPosition="left"
        >
          Review Jawaban
        </Button>
        
        <Button
          variant="default"
          onClick={onRetakeQuiz}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Ulangi Kuis
        </Button>
        
        <Button
          variant="ghost"
          onClick={onBackToDashboard}
          iconName="Home"
          iconPosition="left"
        >
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;