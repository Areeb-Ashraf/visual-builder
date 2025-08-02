import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

// Rachel voice ID (a good default voice)
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM';

export async function generateAudio(text: string): Promise<string> {
  console.log('🔊 Generating audio with ElevenLabs...');
  console.log('📝 Text to convert:', text.substring(0, 100) + '...');
  
  if (!ELEVENLABS_API_KEY) {
    console.log('⚠️ ElevenLabs API key not found, returning empty audio URL');
    return '';
  }
  
  try {
    const response = await axios.post(
      `${ELEVENLABS_API_URL}/text-to-speech/${DEFAULT_VOICE_ID}`,
      {
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        responseType: 'arraybuffer'
      }
    );

    // Save audio file locally (in a real app, you'd upload to S3/CDN)
    const audioDir = path.join(__dirname, '../../../audio');
    await fs.ensureDir(audioDir);
    
    const fileName = `audio-${Date.now()}.mp3`;
    const filePath = path.join(audioDir, fileName);
    
    await fs.writeFile(filePath, response.data);
    
    // Return a local URL (in production, this would be a CDN URL)
    const audioUrl = `http://localhost:3001/audio/${fileName}`;
    
    console.log('✅ Audio generated successfully:', audioUrl);
    return audioUrl;
    
  } catch (error) {
    console.error('❌ ElevenLabs API Error:', error);
    console.log('⚠️ Audio generation failed, returning empty URL');
    return '';
  }
}

// Add a simple static file server for audio files
export function setupAudioRoutes(app: any) {
  const audioDir = path.join(__dirname, '../../../audio');
  app.use('/audio', require('express').static(audioDir));
}