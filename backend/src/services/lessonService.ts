import { LessonData, LessonStep } from '../types/lesson';
import { generateLessonSteps } from './openaiService';
import { generateImage } from './imageService';
import { generateAudio } from './ttsService';

export async function generateLesson(
  topic: string, 
  ageLevel: string, 
  difficulty: string
): Promise<LessonData> {
  console.log(`🎯 Generating lesson for: ${topic} (Age: ${ageLevel}, Difficulty: ${difficulty})`);
  
  // Step 1: Generate lesson structure with OpenAI
  console.log('🧠 Step 1: Generating lesson structure...');
  const steps = await generateLessonSteps(topic, ageLevel, difficulty);
  console.log(`📚 Generated ${steps.length} lesson steps`);
  
  // Step 2: Generate images and audio for each step
  console.log('🎨 Step 2: Generating visual and audio assets...');
  const enrichedSteps: LessonStep[] = [];
  
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`🔄 Processing step ${i + 1}/${steps.length}: ${step.title}`);
    
    try {
      // Generate image
      console.log(`🖼️ Generating image for: ${step.image_prompt}`);
      const imageUrl = await generateImage(step.image_prompt);
      
      // Generate audio
      console.log(`🔊 Generating audio for: ${step.voiceover_script.substring(0, 50)}...`);
      const audioUrl = await generateAudio(step.voiceover_script);
      
      enrichedSteps.push({
        ...step,
        image_url: imageUrl,
        audio_url: audioUrl,
        caption: step.description
      });
      
      console.log(`✅ Step ${i + 1} completed successfully`);
    } catch (error) {
      console.error(`❌ Error processing step ${i + 1}:`, error);
      // Continue with the step but without assets
      enrichedSteps.push({
        ...step,
        image_url: 'https://via.placeholder.com/800x600?text=Image+Generation+Failed',
        audio_url: '',
        caption: step.description
      });
    }
  }
  
  const lesson: LessonData = {
    lesson_id: `lesson-${Date.now()}`,
    title: `${topic} - Visual Lesson`,
    topic,
    age_level: ageLevel,
    difficulty,
    steps: enrichedSteps,
    created_at: new Date().toISOString()
  };
  
  console.log('🎉 Lesson generation completed successfully!');
  console.log(`📊 Final lesson stats:`, {
    id: lesson.lesson_id,
    steps: lesson.steps.length,
    images: lesson.steps.filter(s => s.image_url && !s.image_url.includes('placeholder')).length,
    audio: lesson.steps.filter(s => s.audio_url).length
  });
  
  return lesson;
}