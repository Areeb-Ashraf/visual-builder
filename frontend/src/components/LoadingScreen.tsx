import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { icon: '🧠', text: 'Analyzing your topic...' },
    { icon: '📚', text: 'Breaking down into lesson steps...' },
    { icon: '🎨', text: 'Generating visual content...' },
    { icon: '🔊', text: 'Creating narration...' },
    { icon: '✨', text: 'Finalizing your lesson...' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-animation">
          <div className="spinner"></div>
        </div>
        
        <h2>🎯 Building Your Custom Lesson</h2>
        <p>This may take a few minutes as we generate unique content...</p>
        
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`progress-step ${index === currentStep ? 'active' : index < currentStep ? 'completed' : ''}`}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-text">{step.text}</div>
            </div>
          ))}
        </div>
        
        <div className="loading-bar">
          <div className="loading-fill"></div>
        </div>
        
        <p className="loading-tip">
          💡 <strong>Pro tip:</strong> We're using AI to create unique images and narration just for you!
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;