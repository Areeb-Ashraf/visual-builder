import OpenAI from 'openai';
import fs from 'fs-extra';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Available OpenAI TTS voices: alloy, echo, fable, onyx, nova, shimmer
const DEFAULT_VOICE = 'nova' as const; // Natural, engaging female voice

export async function generateAudio(text: string): Promise<string> {
  console.log('🔊 Generating audio with OpenAI TTS...');
  console.log('📝 Text to convert:', text.substring(0, 100) + '...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️ OpenAI API key not found, returning empty audio URL');
    return '';
  }
  
  try {
    console.log('🎙️ Calling OpenAI TTS API...');
    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: DEFAULT_VOICE,
      input: text,
      response_format: 'mp3'
    });

    // Save audio file locally (in a real app, you'd upload to S3/CDN)
    const audioDir = path.join(__dirname, '../../audio');
    await fs.ensureDir(audioDir);
    
    const fileName = `audio-${Date.now()}.mp3`;
    const filePath = path.join(audioDir, fileName);
    
    // Convert the response to a buffer and save
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
    
    // Return a local URL (in production, this would be a CDN URL)
    const audioUrl = `http://localhost:3001/audio/${fileName}`;
    
    console.log('✅ Audio generated successfully:', audioUrl);
    return audioUrl;
    
  } catch (error) {
    console.error('❌ OpenAI TTS API Error:', error);
    console.log('⚠️ Audio generation failed, returning empty URL');
    return '';
  }
}

// Add a simple static file server for audio files
export function setupAudioRoutes(app: any) {
  const audioDir = path.join(__dirname, '../../audio');
  app.use('/audio', require('express').static(audioDir));
}