import React, { useState } from 'react';
import './TopicInput.css';

interface TopicInputProps {
  onGenerateLesson: (topic: string, ageLevel: string, difficulty: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onGenerateLesson }) => {
  const [topic, setTopic] = useState('');
  const [ageLevel, setAgeLevel] = useState('middle school');
  const [difficulty, setDifficulty] = useState('beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerateLesson(topic.trim(), ageLevel, difficulty);
    }
  };

  const exampleTopics = [
    'Photosynthesis',
    'How a Bill Becomes Law',
    'Binary Search Algorithm',
    'The Water Cycle',
    'Ancient Egyptian Pyramids',
    'DNA Replication'
  ];

  return (
    <div className="topic-input-container">
      <div className="topic-input-card">
        <h2>✨ What would you like to learn about?</h2>
        <p>Enter any topic and I'll create a visual lesson with narration!</p>
        
        <form onSubmit={handleSubmit} className="topic-form">
          <div className="input-group">
            <label htmlFor="topic">Topic or Concept:</label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How volcanoes form, JavaScript functions, Photosynthesis..."
              className="topic-input"
              required
            />
          </div>

          <div className="options-row">
            <div className="input-group">
              <label htmlFor="age-level">Age Level:</label>
              <select
                id="age-level"
                value={ageLevel}
                onChange={(e) => setAgeLevel(e.target.value)}
                className="select-input"
              >
                <option value="elementary">Elementary</option>
                <option value="middle school">Middle School</option>
                <option value="high school">High School</option>
                <option value="college">College</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="select-input"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <button type="submit" className="generate-button" disabled={!topic.trim()}>
            🚀 Generate Visual Lesson
          </button>
        </form>

        <div className="examples-section">
          <h3>💡 Example Topics:</h3>
          <div className="examples-grid">
            {exampleTopics.map((example, index) => (
              <button
                key={index}
                onClick={() => setTopic(example)}
                className="example-button"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicInput;