import React, { useState } from 'react';
import './App.css';
import TopicInput from './components/TopicInput';
import LessonViewer from './components/LessonViewer';
import LoadingScreen from './components/LoadingScreen';
import { LessonData } from './types/lesson';

function App() {
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLesson = async (topic: string, ageLevel: string, difficulty: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentLesson(null);

    try {
      console.log('🚀 Generating lesson for:', { topic, ageLevel, difficulty });
      
      const response = await fetch('http://localhost:3001/api/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, ageLevel, difficulty }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const lesson = await response.json();
      console.log('✅ Lesson received:', lesson);
      
      setCurrentLesson(lesson);
    } catch (err) {
      console.error('❌ Error generating lesson:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate lesson');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentLesson(null);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎓 AI Visual Lesson Builder</h1>
        <p>Give me a concept — I'll give you a narrated visual story.</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            <h3>❌ Error</h3>
            <p>{error}</p>
            <button onClick={handleStartOver} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {isLoading && <LoadingScreen />}

        {!currentLesson && !isLoading && !error && (
          <TopicInput onGenerateLesson={handleGenerateLesson} />
        )}

        {currentLesson && !isLoading && (
          <LessonViewer lesson={currentLesson} onStartOver={handleStartOver} />
        )}
      </main>

      <footer className="App-footer">
        <p>Powered by OpenAI GPT-4, DALL-E, and ElevenLabs</p>
      </footer>
    </div>
  );
}

export default App;
