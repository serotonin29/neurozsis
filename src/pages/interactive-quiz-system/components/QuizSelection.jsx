import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuizSelection = ({ onStartQuiz }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState('');

  const subjects = [
    { value: 'anatomy', label: 'Anatomi', description: 'Struktur tubuh manusia' },
    { value: 'physiology', label: 'Fisiologi', description: 'Fungsi organ dan sistem tubuh' },
    { value: 'pharmacology', label: 'Farmakologi', description: 'Obat-obatan dan efeknya' },
    { value: 'pathology', label: 'Patologi', description: 'Penyakit dan kelainan' },
    { value: 'neuroscience', label: 'Neurosains', description: 'Sistem saraf dan otak' },
    { value: 'cardiology', label: 'Kardiologi', description: 'Sistem kardiovaskular' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Pemula', description: 'Konsep dasar dan fundamental' },
    { value: 'intermediate', label: 'Menengah', description: 'Aplikasi konsep dalam kasus' },
    { value: 'advanced', label: 'Lanjutan', description: 'Analisis kompleks dan diagnosis' }
  ];

  const questionCounts = [
    { value: '10', label: '10 Soal', description: '~15 menit' },
    { value: '20', label: '20 Soal', description: '~30 menit' },
    { value: '30', label: '30 Soal', description: '~45 menit' },
    { value: '50', label: '50 Soal', description: '~75 menit' }
  ];

  const mockQuizzes = [
    {
      id: 'anatomy-basic',
      title: 'Anatomi Dasar - Sistem Muskuloskeletal',
      subject: 'Anatomi',
      difficulty: 'Pemula',
      questionCount: 15,
      duration: 20,
      description: 'Kuis tentang struktur dasar tulang, otot, dan sendi',
      completedBy: 1247,
      averageScore: 78
    },
    {
      id: 'physiology-cardio',
      title: 'Fisiologi Kardiovaskular',
      subject: 'Fisiologi',
      difficulty: 'Menengah',
      questionCount: 25,
      duration: 35,
      description: 'Memahami fungsi jantung dan sistem peredaran darah',
      completedBy: 892,
      averageScore: 72
    },
    {
      id: 'neuro-advanced',
      title: 'Neurosains Klinis',
      subject: 'Neurosains',
      difficulty: 'Lanjutan',
      questionCount: 30,
      duration: 45,
      description: 'Kasus klinis sistem saraf dan diagnosis neurologis',
      completedBy: 456,
      averageScore: 65
    },
    {
      id: 'pharma-basic',
      title: 'Farmakologi Dasar',
      subject: 'Farmakologi',
      difficulty: 'Pemula',
      questionCount: 20,
      duration: 25,
      description: 'Prinsip dasar kerja obat dan farmakokinetik',
      completedBy: 1089,
      averageScore: 81
    }
  ];

  const handleStartCustomQuiz = () => {
    if (selectedSubject && selectedDifficulty && selectedQuestionCount) {
      onStartQuiz({
        type: 'custom',
        subject: selectedSubject,
        difficulty: selectedDifficulty,
        questionCount: parseInt(selectedQuestionCount)
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Pemula': return 'text-success bg-success/10';
      case 'Menengah': return 'text-warning bg-warning/10';
      case 'Lanjutan': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Brain" size={32} className="text-primary" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
            Sistem Kuis Interaktif
          </h1>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Uji pemahaman Anda dengan kuis interaktif yang dirancang khusus untuk mahasiswa kedokteran. 
            Pilih topik dan tingkat kesulitan sesuai kebutuhan belajar Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Custom Quiz Builder */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="text-center">
              <Icon name="Settings" size={24} className="mx-auto text-primary mb-2" />
              <h2 className="font-heading font-semibold text-lg text-foreground">
                Buat Kuis Custom
              </h2>
              <p className="font-caption text-sm text-muted-foreground mt-1">
                Sesuaikan kuis dengan kebutuhan belajar Anda
              </p>
            </div>

            <div className="space-y-4">
              <Select
                label="Pilih Mata Kuliah"
                placeholder="Pilih mata kuliah..."
                options={subjects}
                value={selectedSubject}
                onChange={setSelectedSubject}
                required
              />

              <Select
                label="Tingkat Kesulitan"
                placeholder="Pilih tingkat kesulitan..."
                options={difficulties}
                value={selectedDifficulty}
                onChange={setSelectedDifficulty}
                required
              />

              <Select
                label="Jumlah Soal"
                placeholder="Pilih jumlah soal..."
                options={questionCounts}
                value={selectedQuestionCount}
                onChange={setSelectedQuestionCount}
                required
              />
            </div>

            <Button
              variant="default"
              onClick={handleStartCustomQuiz}
              disabled={!selectedSubject || !selectedDifficulty || !selectedQuestionCount}
              iconName="Play"
              iconPosition="left"
              className="w-full"
            >
              Mulai Kuis Custom
            </Button>
          </div>
        </div>

        {/* Pre-made Quizzes */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
                Kuis Populer
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                Kuis yang telah disiapkan dan sering digunakan oleh mahasiswa lain
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockQuizzes.map((quiz) => (
                <div key={quiz.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-clinical-lg transition-clinical">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        {quiz.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-body font-medium text-sm text-foreground">
                        {quiz.subject}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-heading font-semibold text-sm text-foreground">
                          {quiz.questionCount}
                        </div>
                        <div className="font-caption text-xs text-muted-foreground">
                          Soal
                        </div>
                      </div>
                      <div>
                        <div className="font-heading font-semibold text-sm text-foreground">
                          {quiz.duration}m
                        </div>
                        <div className="font-caption text-xs text-muted-foreground">
                          Durasi
                        </div>
                      </div>
                      <div>
                        <div className="font-heading font-semibold text-sm text-foreground">
                          {quiz.averageScore}%
                        </div>
                        <div className="font-caption text-xs text-muted-foreground">
                          Rata-rata
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Icon name="Users" size={14} />
                        <span className="font-caption text-xs">
                          {quiz.completedBy.toLocaleString()} telah mengerjakan
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => onStartQuiz({ type: 'preset', quizId: quiz.id })}
                      iconName="Play"
                      iconPosition="left"
                      className="w-full"
                    >
                      Mulai Kuis
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-muted/50 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-heading font-bold text-2xl text-foreground">
              2,847
            </div>
            <div className="font-caption text-sm text-muted-foreground">
              Total Kuis Tersedia
            </div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl text-foreground">
              15,692
            </div>
            <div className="font-caption text-sm text-muted-foreground">
              Kuis Diselesaikan
            </div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl text-foreground">
              76%
            </div>
            <div className="font-caption text-sm text-muted-foreground">
              Rata-rata Skor
            </div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl text-foreground">
              1,234
            </div>
            <div className="font-caption text-sm text-muted-foreground">
              Mahasiswa Aktif
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;