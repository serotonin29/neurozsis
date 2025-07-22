import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import QuizSelection from './components/QuizSelection';
import QuizHeader from './components/QuizHeader';
import QuestionContent from './components/QuestionContent';
import QuizNavigation from './components/QuizNavigation';
import QuizSidebar from './components/QuizSidebar';
import QuizResults from './components/QuizResults';

const InteractiveQuizSystem = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('selection'); // selection, quiz, results
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Mock user data
  const mockUser = {
    name: "Ahmad Rizki",
    email: "ahmad.rizki@student.unp.ac.id",
    studentId: "2024001",
    role: "Mahasiswa",
    progress: 78
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Kuis Baru Tersedia",
      message: "Kuis Farmakologi Dasar telah ditambahkan",
      time: "2 jam yang lalu",
      read: false
    },
    {
      id: 2,
      title: "Hasil Kuis",
      message: "Anda mendapat skor 85% pada kuis Anatomi",
      time: "1 hari yang lalu",
      read: true
    }
  ];

  // Mock quiz questions
  const mockQuestions = [
    {
      id: 'q1',
      type: 'multiple-choice',
      text: 'Manakah dari berikut ini yang merupakan fungsi utama dari sistem saraf parasimpatis?',
      description: 'Pilih jawaban yang paling tepat mengenai fungsi sistem saraf parasimpatis.',
      options: [
        { id: 'a', text: 'Meningkatkan denyut jantung dan tekanan darah', isCorrect: false },
        { id: 'b', text: 'Mengatur respons "fight or flight"', isCorrect: false },
        { id: 'c', text: 'Mengatur aktivitas "rest and digest"', isCorrect: true },
        { id: 'd', text: 'Mengontrol gerakan volunter otot rangka', isCorrect: false }
      ],
      explanation: `Sistem saraf parasimpatis bertanggung jawab untuk mengatur aktivitas tubuh saat istirahat, termasuk pencernaan, produksi air liur, dan penurunan denyut jantung. Ini dikenal sebagai respons "rest and digest".`,
      referenceLink: '/material-viewer?topic=nervous-system'
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      text: 'Hormon insulin diproduksi oleh sel-sel apa dalam pankreas?',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      options: [
        { id: 'a', text: 'Sel alfa (α)', isCorrect: false },
        { id: 'b', text: 'Sel beta (β)', isCorrect: true },
        { id: 'c', text: 'Sel delta (δ)', isCorrect: false },
        { id: 'd', text: 'Sel gamma (γ)', isCorrect: false }
      ],
      explanation: `Sel beta (β) dalam pulau Langerhans pankreas memproduksi insulin. Insulin berperan penting dalam mengatur kadar glukosa darah dengan memfasilitasi uptake glukosa ke dalam sel.`,
      referenceLink: '/material-viewer?topic=endocrine-system'
    },
    {
      id: 'q3',
      type: 'drag-drop',
      text: 'Susunlah urutan aliran darah melalui jantung dengan benar:',
      description: 'Seret setiap komponen ke posisi yang tepat dalam urutan aliran darah.',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&h=400&fit=crop',
      dragItems: [
        { id: 'item1', text: 'Atrium Kanan' },
        { id: 'item2', text: 'Ventrikel Kanan' },
        { id: 'item3', text: 'Paru-paru' },
        { id: 'item4', text: 'Atrium Kiri' },
        { id: 'item5', text: 'Ventrikel Kiri' }
      ],
      dropZones: [
        { id: 'zone1', label: 'Langkah 1' },
        { id: 'zone2', label: 'Langkah 2' },
        { id: 'zone3', label: 'Langkah 3' },
        { id: 'zone4', label: 'Langkah 4' },
        { id: 'zone5', label: 'Langkah 5' }
      ],
      correctAnswer: {
        zone1: 'item1',
        zone2: 'item2', 
        zone3: 'item3',
        zone4: 'item4',
        zone5: 'item5'
      },
      explanation: `Aliran darah melalui jantung: Darah vena masuk ke atrium kanan → ventrikel kanan → paru-paru untuk oksigenasi → atrium kiri → ventrikel kiri → dipompa ke seluruh tubuh.`
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      text: 'Apa yang dimaksud dengan homeostasis dalam fisiologi?',
      options: [
        { id: 'a', text: 'Proses pembelahan sel', isCorrect: false },
        { id: 'b', text: 'Kemampuan tubuh mempertahankan kondisi internal yang stabil', isCorrect: true },
        { id: 'c', text: 'Proses metabolisme energi', isCorrect: false },
        { id: 'd', text: 'Sistem transportasi dalam tubuh', isCorrect: false }
      ],
      explanation: `Homeostasis adalah kemampuan organisme untuk mempertahankan kondisi internal yang relatif stabil meskipun terjadi perubahan di lingkungan eksternal. Contohnya pengaturan suhu tubuh, pH darah, dan kadar glukosa.`,
      referenceLink: '/material-viewer?topic=homeostasis'
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      text: 'Neurotransmitter utama yang dilepaskan di neuromuscular junction adalah:',
      options: [
        { id: 'a', text: 'Dopamin', isCorrect: false },
        { id: 'b', text: 'Serotonin', isCorrect: false },
        { id: 'c', text: 'Asetilkolin', isCorrect: true },
        { id: 'd', text: 'GABA', isCorrect: false }
      ],
      explanation: `Asetilkolin (ACh) adalah neurotransmitter yang dilepaskan di neuromuscular junction untuk memicu kontraksi otot rangka. ACh berikatan dengan reseptor nikotinik pada membran otot.`,
      referenceLink: '/material-viewer?topic=neurotransmitters'
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (currentView === 'quiz' && timeRemaining > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentView, timeRemaining, isSubmitted]);

  const handleStartQuiz = (quizConfig) => {
    const quiz = {
      id: Date.now(),
      title: quizConfig.type === 'custom' 
        ? `Kuis ${quizConfig.subject} - ${quizConfig.difficulty}`
        : 'Anatomi Dasar - Sistem Muskuloskeletal',
      questions: mockQuestions.slice(0, quizConfig.questionCount || 5),
      timeLimit: (quizConfig.questionCount || 5) * 120, // 2 minutes per question
      subject: quizConfig.subject || 'anatomy'
    };
    
    setQuizData(quiz);
    setTimeRemaining(quiz.timeLimit);
    setTimeSpent(0);
    setCurrentQuestion(1);
    setAnswers({});
    setFlaggedQuestions([]);
    setIsSubmitted(false);
    setShowFeedback(false);
    setCurrentView('quiz');
  };

  const handleAnswerSelect = (answer) => {
    if (!isSubmitted) {
      setAnswers(prev => ({
        ...prev,
        [quizData.questions[currentQuestion - 1].id]: answer
      }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length) {
      setCurrentQuestion(prev => prev + 1);
      setIsSidebarOpen(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
      setIsSidebarOpen(false);
    }
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestion(questionNumber);
    setIsSidebarOpen(false);
  };

  const handleToggleFlag = (questionId) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === 'multiple-choice') {
        const correctOption = question.options.find(opt => opt.isCorrect);
        if (userAnswer === correctOption?.id) correct++;
      } else if (question.type === 'drag-drop') {
        const isCorrect = Object.keys(question.correctAnswer).every(
          zone => userAnswer?.[zone]?.id === question.correctAnswer[zone]
        );
        if (isCorrect) correct++;
      }
    });
    return correct;
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    setShowFeedback(true);
    
    // Calculate results
    const score = calculateScore();
    const subjectAnalysis = [
      { topic: 'Sistem Saraf', correct: 2, total: 3 },
      { topic: 'Sistem Kardiovaskular', correct: 1, total: 1 },
      { topic: 'Sistem Endokrin', correct: 1, total: 1 }
    ];
    
    const recommendations = [
      'Review materi sistem saraf parasimpatis dan neurotransmitter',
      'Pelajari lebih lanjut tentang anatomi jantung dan sirkulasi darah',
      'Latihan soal drag-and-drop untuk meningkatkan pemahaman visual',
      'Baca kembali konsep homeostasis dan regulasi fisiologis'
    ];

    setTimeout(() => {
      setCurrentView('results');
    }, 2000);
  };

  const handleRetakeQuiz = () => {
    setCurrentView('selection');
    setQuizData(null);
    setCurrentQuestion(1);
    setAnswers({});
    setFlaggedQuestions([]);
    setTimeRemaining(0);
    setTimeSpent(0);
    setIsSubmitted(false);
    setShowFeedback(false);
  };

  const handleViewReview = () => {
    setCurrentView('quiz');
    setCurrentQuestion(1);
    setShowFeedback(true);
  };

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleLogout = () => {
    navigate('/login-registration');
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const currentQuestionData = quizData?.questions[currentQuestion - 1];
  const canGoNext = currentQuestionData && (
    answers[currentQuestionData.id] !== undefined && 
    answers[currentQuestionData.id] !== null
  );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={mockUser}
        notifications={mockNotifications}
        onLogout={handleLogout}
        onNotificationClick={handleNotificationClick}
      />
      
      {currentView !== 'quiz' && <Navigation />}
      
      <main className={`${currentView !== 'quiz' ? 'pt-32 lg:pt-28' : 'pt-16'} pb-20 lg:pb-6`}>
        {currentView === 'selection' && (
          <QuizSelection onStartQuiz={handleStartQuiz} />
        )}

        {currentView === 'quiz' && quizData && (
          <div className="flex h-screen pt-16">
            <div className="flex-1 flex flex-col">
              <QuizHeader
                currentQuestion={currentQuestion}
                totalQuestions={quizData.questions.length}
                timeRemaining={timeRemaining}
                quizTitle={quizData.title}
                onMenuToggle={() => setIsSidebarOpen(true)}
                showTimer={!isSubmitted}
              />
              
              <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="max-w-4xl mx-auto">
                  <QuestionContent
                    question={currentQuestionData}
                    selectedAnswer={answers[currentQuestionData.id]}
                    onAnswerSelect={handleAnswerSelect}
                    showFeedback={showFeedback}
                    isSubmitted={isSubmitted}
                  />
                </div>
              </div>
              
              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={quizData.questions.length}
                onPrevious={handlePreviousQuestion}
                onNext={handleNextQuestion}
                onSubmit={handleSubmitQuiz}
                canGoNext={canGoNext}
                isLastQuestion={currentQuestion === quizData.questions.length}
                isSubmitted={isSubmitted}
              />
            </div>
            
            <QuizSidebar
              questions={quizData.questions}
              currentQuestion={currentQuestion}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
              onQuestionSelect={handleQuestionSelect}
              onToggleFlag={handleToggleFlag}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        )}

        {currentView === 'results' && (
          <QuizResults
            score={calculateScore()}
            totalQuestions={quizData?.questions.length || 0}
            timeSpent={timeSpent}
            subjectAnalysis={[
              { topic: 'Sistem Saraf', correct: 2, total: 3 },
              { topic: 'Sistem Kardiovaskular', correct: 1, total: 1 },
              { topic: 'Sistem Endokrin', correct: 1, total: 1 }
            ]}
            recommendations={[
              'Review materi sistem saraf parasimpatis dan neurotransmitter',
              'Pelajari lebih lanjut tentang anatomi jantung dan sirkulasi darah',
              'Latihan soal drag-and-drop untuk meningkatkan pemahaman visual',
              'Baca kembali konsep homeostasis dan regulasi fisiologis'
            ]}
            onRetakeQuiz={handleRetakeQuiz}
            onViewReview={handleViewReview}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </main>
    </div>
  );
};

export default InteractiveQuizSystem;