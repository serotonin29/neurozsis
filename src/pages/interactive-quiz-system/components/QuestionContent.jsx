import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const QuestionContent = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  showFeedback = false,
  isSubmitted = false 
}) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZones, setDropZones] = useState({});
  const dragRef = useRef(null);

  useEffect(() => {
    if (question.type === 'drag-drop' && question.dragItems) {
      const initialZones = {};
      question.dropZones.forEach(zone => {
        initialZones[zone.id] = selectedAnswer?.[zone.id] || null;
      });
      setDropZones(initialZones);
    }
  }, [question, selectedAnswer]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (draggedItem) {
      const newDropZones = { ...dropZones };
      
      // Remove item from previous zone
      Object.keys(newDropZones).forEach(key => {
        if (newDropZones[key]?.id === draggedItem.id) {
          newDropZones[key] = null;
        }
      });
      
      // Add item to new zone
      newDropZones[zoneId] = draggedItem;
      setDropZones(newDropZones);
      onAnswerSelect(newDropZones);
      setDraggedItem(null);
    }
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {question.options.map((option, index) => {
        const isSelected = selectedAnswer === option.id;
        const isCorrect = showFeedback && option.isCorrect;
        const isWrong = showFeedback && isSelected && !option.isCorrect;
        
        return (
          <button
            key={option.id}
            onClick={() => !isSubmitted && onAnswerSelect(option.id)}
            disabled={isSubmitted}
            className={`w-full p-4 text-left border-2 rounded-lg transition-clinical ${
              isSelected
                ? isCorrect
                  ? 'border-success bg-success/10 text-success'
                  : isWrong
                  ? 'border-error bg-error/10 text-error' :'border-primary bg-primary/10 text-primary' :'border-border bg-card hover:border-muted-foreground hover:bg-muted'
            } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                isSelected
                  ? isCorrect
                    ? 'border-success bg-success'
                    : isWrong
                    ? 'border-error bg-error' :'border-primary bg-primary' :'border-muted-foreground'
              }`}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-body font-medium text-sm">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <p className="font-body text-sm">{option.text}</p>
                </div>
                {option.image && (
                  <div className="mt-2">
                    <Image 
                      src={option.image} 
                      alt={`Option ${String.fromCharCode(65 + index)}`}
                      className="max-w-xs rounded-lg"
                    />
                  </div>
                )}
              </div>
              {showFeedback && isCorrect && (
                <Icon name="CheckCircle" size={20} className="text-success" />
              )}
              {showFeedback && isWrong && (
                <Icon name="XCircle" size={20} className="text-error" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderDragDrop = () => (
    <div className="space-y-6">
      {/* Drag Items */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-body font-medium text-sm text-foreground mb-3">
          Seret item berikut ke tempat yang sesuai:
        </h4>
        <div className="flex flex-wrap gap-3">
          {question.dragItems.filter(item => 
            !Object.values(dropZones).some(zone => zone?.id === item.id)
          ).map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="bg-card border-2 border-border px-4 py-2 rounded-lg cursor-move hover:border-primary transition-clinical shadow-clinical"
            >
              <span className="font-body text-sm text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drop Zones */}
      <div className="space-y-4">
        {question.image && (
          <div className="relative">
            <Image 
              src={question.image} 
              alt="Diagram untuk drag and drop"
              className="w-full max-w-2xl mx-auto rounded-lg"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.dropZones.map((zone) => (
            <div
              key={zone.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
              className={`min-h-16 p-4 border-2 border-dashed rounded-lg transition-clinical ${
                dropZones[zone.id]
                  ? 'border-primary bg-primary/10' :'border-muted-foreground bg-muted/30 hover:border-primary hover:bg-primary/5'
              }`}
            >
              <div className="text-center">
                <p className="font-caption text-xs text-muted-foreground mb-2">
                  {zone.label}
                </p>
                {dropZones[zone.id] ? (
                  <div className="bg-card border border-border px-3 py-2 rounded">
                    <span className="font-body text-sm text-foreground">
                      {dropZones[zone.id].text}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-8">
                    <Icon name="Plus" size={16} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <div className="space-y-4">
        <h2 className="font-heading font-semibold text-lg text-foreground leading-relaxed">
          {question.text}
        </h2>
        
        {question.description && (
          <p className="font-body text-sm text-muted-foreground">
            {question.description}
          </p>
        )}

        {question.image && question.type !== 'drag-drop' && (
          <div className="flex justify-center">
            <Image 
              src={question.image} 
              alt="Gambar soal"
              className="max-w-full h-auto rounded-lg shadow-clinical"
            />
          </div>
        )}
      </div>

      {/* Question Content */}
      <div>
        {question.type === 'multiple-choice' && renderMultipleChoice()}
        {question.type === 'drag-drop' && renderDragDrop()}
      </div>

      {/* Feedback */}
      {showFeedback && question.explanation && (
        <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-sm text-foreground mb-2">
                Penjelasan:
              </h4>
              <p className="font-body text-sm text-muted-foreground">
                {question.explanation}
              </p>
              {question.referenceLink && (
                <a 
                  href={question.referenceLink}
                  className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 transition-clinical mt-2"
                >
                  <span className="font-caption text-xs">Baca materi terkait</span>
                  <Icon name="ExternalLink" size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionContent;