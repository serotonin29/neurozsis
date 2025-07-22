import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyTimer = ({ onTimeUpdate, isActive = true }) => {
  const [studyTime, setStudyTime] = useState(0);
  const [isRunning, setIsRunning] = useState(isActive);
  const [sessionGoal, setSessionGoal] = useState(30 * 60); // 30 minutes default
  const [showSettings, setShowSettings] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (isRunning && !isBreak) {
      intervalRef.current = setInterval(() => {
        setStudyTime(prev => {
          const newTime = prev + 1;
          if (onTimeUpdate) onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak, onTimeUpdate]);

  useEffect(() => {
    // Auto-start break when session goal is reached
    if (studyTime >= sessionGoal && sessionGoal > 0) {
      handleBreakStart();
    }
  }, [studyTime, sessionGoal]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  };

  const getProgressPercentage = () => {
    if (sessionGoal === 0) return 0;
    return Math.min((studyTime / sessionGoal) * 100, 100);
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      startTimeRef.current = Date.now();
    }
  };

  const handleReset = () => {
    setStudyTime(0);
    setBreakTime(0);
    setIsRunning(false);
    setIsBreak(false);
    setPomodoroCount(0);
    startTimeRef.current = Date.now();
  };

  const handleBreakStart = () => {
    setIsBreak(true);
    setIsRunning(true);
    setPomodoroCount(prev => prev + 1);
    
    // Start break timer
    const breakDuration = pomodoroCount > 0 && pomodoroCount % 4 === 0 ? 15 * 60 : 5 * 60; // Long break every 4 sessions
    let breakSeconds = 0;
    
    const breakInterval = setInterval(() => {
      breakSeconds++;
      setBreakTime(breakSeconds);
      
      if (breakSeconds >= breakDuration) {
        clearInterval(breakInterval);
        setIsBreak(false);
        setBreakTime(0);
        setStudyTime(0); // Reset study time for new session
      }
    }, 1000);
  };

  const handleBreakEnd = () => {
    setIsBreak(false);
    setBreakTime(0);
    setStudyTime(0);
  };

  const goalOptions = [
    { value: 15 * 60, label: '15 menit' },
    { value: 25 * 60, label: '25 menit (Pomodoro)' },
    { value: 30 * 60, label: '30 menit' },
    { value: 45 * 60, label: '45 menit' },
    { value: 60 * 60, label: '1 jam' },
    { value: 90 * 60, label: '1.5 jam' },
    { value: 0, label: 'Tanpa batas' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-clinical">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Timer" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">Timer Belajar</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Icon name="Settings" size={16} />
        </Button>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Progress Circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - getProgressPercentage() / 100)}`}
              className={`transition-clinical ${isBreak ? 'text-warning' : 'text-primary'}`}
            />
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-xl font-bold text-foreground">
              {formatTime(isBreak ? breakTime : studyTime)}
            </span>
            <span className="font-caption text-xs text-muted-foreground">
              {isBreak ? 'Istirahat' : 'Belajar'}
            </span>
          </div>
        </div>

        {/* Session Info */}
        {sessionGoal > 0 && !isBreak && (
          <div className="text-center mb-4">
            <p className="font-caption text-xs text-muted-foreground">
              Target: {formatTime(sessionGoal)}
            </p>
            <div className="w-full bg-muted rounded-full h-1 mt-1">
              <div 
                className="bg-primary h-1 rounded-full transition-clinical" 
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        {/* Pomodoro Counter */}
        {pomodoroCount > 0 && (
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < (pomodoroCount % 4) ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
            <span className="font-caption text-xs text-muted-foreground ml-2">
              Sesi: {pomodoroCount}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Button
          variant={isRunning ? "outline" : "default"}
          size="sm"
          onClick={handlePlayPause}
          disabled={isBreak}
        >
          <Icon name={isRunning ? "Pause" : "Play"} size={16} className="mr-1" />
          {isRunning ? "Jeda" : "Mulai"}
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleReset}>
          <Icon name="RotateCcw" size={16} className="mr-1" />
          Reset
        </Button>

        {isBreak && (
          <Button variant="outline" size="sm" onClick={handleBreakEnd}>
            <Icon name="SkipForward" size={16} className="mr-1" />
            Lewati
          </Button>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-border pt-4">
          <h4 className="font-body font-medium text-sm text-foreground mb-3">Pengaturan Timer</h4>
          
          <div className="space-y-3">
            <div>
              <label className="font-caption text-xs text-muted-foreground mb-1 block">
                Target Sesi Belajar
              </label>
              <select
                value={sessionGoal}
                onChange={(e) => setSessionGoal(Number(e.target.value))}
                className="w-full p-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-caption text-xs text-muted-foreground">
                Notifikasi Suara
              </span>
              <button className="w-10 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-clinical" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-caption text-xs text-muted-foreground">
                Auto-start Istirahat
              </span>
              <button className="w-10 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-clinical" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Break Notification */}
      {isBreak && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center">
          <Icon name="Coffee" size={20} className="mx-auto text-warning mb-2" />
          <p className="font-body text-sm text-warning-foreground">
            Waktu istirahat! Selamat, Anda telah menyelesaikan sesi belajar.
          </p>
          <p className="font-caption text-xs text-warning-foreground/80 mt-1">
            {pomodoroCount % 4 === 0 ? 'Istirahat panjang (15 menit)' : 'Istirahat pendek (5 menit)'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyTimer;