import OpenAI from 'openai';
import { LessonStep } from '../types/lesson';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateLessonSteps(
  topic: string, 
  ageLevel: string, 
  difficulty: string
): Promise<LessonStep[]> {
  console.log('🤖 Calling OpenAI GPT-4 for lesson breakdown...');
  
  const prompt = `You are an expert educational content creator. Break down the concept "${topic}" into a clear, engaging visual lesson suitable for ${ageLevel} students at ${difficulty} level.

Create 4-6 logical steps that build upon each other. For each step, provide:

1. A clear, descriptive title
2. A detailed description explaining the concept
3. A specific image prompt for DALL-E (be very descriptive, mention style, colors, composition)
4. A voiceover script that's engaging and educational (2-3 sentences)

Return your response as a JSON array with this exact structure:
[
  {
    "title": "Step title here",
    "description": "Detailed explanation here",
    "image_prompt": "Detailed image description here",
    "voiceover_script": "Engaging narration script here"
  }
]

Make sure the content is:
- Age-appropriate for ${ageLevel}
- Clear and progressive (each step builds on the previous)
- Visual (descriptions that can be illustrated)
- Engaging and educational

Topic: ${topic}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert educational content creator specializing in visual learning materials."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    console.log('📝 OpenAI Response:', content);

    // Parse the JSON response
    const steps = JSON.parse(content) as LessonStep[];
    
    if (!Array.isArray(steps) || steps.length === 0) {
      throw new Error('Invalid response format from OpenAI');
    }

    console.log(`✅ Successfully parsed ${steps.length} lesson steps`);
    return steps;
    
  } catch (error) {
    console.error('❌ OpenAI API Error:', error);
    
    // Fallback: return a simple lesson structure
    console.log('⚠️ Using fallback lesson structure');
    return [
      {
        title: `Introduction to ${topic}`,
        description: `Welcome to our lesson about ${topic}. We'll explore this concept step by step.`,
        image_prompt: `Educational illustration showing an overview of ${topic}, clean and simple style, bright colors`,
        voiceover_script: `Welcome to our lesson about ${topic}. Today we'll learn about this fascinating concept together.`
      },
      {
        title: `Understanding ${topic}`,
        description: `Let's dive deeper into what ${topic} really means and why it's important.`,
        image_prompt: `Detailed diagram explaining ${topic}, educational style, clear labels and arrows`,
        voiceover_script: `Now let's understand what ${topic} really means and why it's so important to learn about.`
      },
      {
        title: `${topic} in Action`,
        description: `Here's how ${topic} works in real-world situations.`,
        image_prompt: `Real-world example of ${topic} in action, photorealistic style, clear and educational`,
        voiceover_script: `Here's how you can see ${topic} working in the real world around us.`
      }
    ];
  }
}