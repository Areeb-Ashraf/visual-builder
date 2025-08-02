import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateLesson } from './services/lessonService';
import { setupAudioRoutes } from './services/ttsService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Setup audio file serving
setupAudioRoutes(app);

// Routes
app.post('/api/generate-lesson', async (req, res) => {
  try {
    console.log('📝 Received lesson generation request:', req.body);
    
    const { topic, ageLevel = 'middle school', difficulty = 'beginner' } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    console.log(`🚀 Starting lesson generation for: "${topic}"`);
    const lesson = await generateLesson(topic, ageLevel, difficulty);
    
    console.log('✅ Lesson generated successfully:', {
      lessonId: lesson.lesson_id,
      stepCount: lesson.steps.length
    });
    
    res.json(lesson);
  } catch (error) {
    console.error('❌ Error generating lesson:', error);
    res.status(500).json({ 
      error: 'Failed to generate lesson',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Visual Lesson Builder API is running' });
});

app.listen(PORT, () => {
  console.log(`🌟 AI Visual Lesson Builder API running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});