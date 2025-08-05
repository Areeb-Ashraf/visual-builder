import React, { useState, useRef, useEffect } from 'react';
import { LessonData } from '../types/lesson';
import './LessonViewer.css';

interface LessonViewerProps {
  lesson: LessonData;
  onStartOver: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onStartOver }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentStep = lesson.steps[currentStepIndex];

  useEffect(() => {
    // Reset audio when step changes
    setIsPlaying(false);
    setAudioLoaded(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentStepIndex]);

  const handlePlayAudio = () => {
    if (!audioRef.current || !currentStep.audio_url) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <div className="lesson-viewer">
      <div className="lesson-header">
        <div className="lesson-title">
          <h1>{lesson.title}</h1>
          <div className="lesson-meta">
            <span className="age-level">👥 {lesson.age_level}</span>
            <span className="difficulty">📊 {lesson.difficulty}</span>
            <span className="step-counter">
              📖 Step {currentStepIndex + 1} of {lesson.steps.length}
            </span>
          </div>
        </div>
        <button onClick={onStartOver} className="start-over-button">
          🔄 Create New Lesson
        </button>
      </div>

      <div className="lesson-content">
        <div className="step-viewer">
          <div className="step-image-container">
            {currentStep.image_url ? (
              <img 
                src={currentStep.image_url} 
                alt={currentStep.title}
                className="step-image"
              />
            ) : (
              <div className="image-placeholder">
                <span>🖼️ Image not available</span>
              </div>
            )}
          </div>

          <div className="step-content">
            <h2 className="step-title">{currentStep.title}</h2>
            <p className="step-description">{currentStep.description}</p>
            
            {currentStep.audio_url && (
              <div className="audio-controls">
                <button 
                  onClick={handlePlayAudio} 
                  className={`play-button ${isPlaying ? 'playing' : ''}`}
                  disabled={!audioLoaded && !!currentStep.audio_url}
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Play Narration'}
                </button>
                
                <audio
                  ref={audioRef}
                  src={currentStep.audio_url}
                  onEnded={handleAudioEnded}
                  onCanPlay={() => setAudioLoaded(true)}
                  onError={(e) => console.error('Audio error:', e)}
                />
              </div>
            )}

            <div className="step-navigation">
              <button 
                onClick={prevStep} 
                disabled={currentStepIndex === 0}
                className="nav-button prev-button"
              >
                ⬅️ Previous
              </button>
              
              <button 
                onClick={nextStep} 
                disabled={currentStepIndex === lesson.steps.length - 1}
                className="nav-button next-button"
              >
                Next ➡️
              </button>
            </div>
          </div>
        </div>

        <div className="lesson-timeline">
          <h3>📋 Lesson Overview</h3>
          <div className="timeline-steps">
            {lesson.steps.map((step, index) => (
              <div 
                key={index}
                className={`timeline-step ${index === currentStepIndex ? 'current' : index < currentStepIndex ? 'completed' : ''}`}
                onClick={() => goToStep(index)}
              >
                <div className="timeline-number">{index + 1}</div>
                <div className="timeline-title">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <div className="lesson-info">
          <p>🎨 Generated {lesson.steps.length} unique visuals</p>
          <p>🔊 Created custom narration</p>
          <p>⏰ Created on {new Date(lesson.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;