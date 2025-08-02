import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt: string): Promise<string> {
  console.log('🎨 Generating image with DALL-E...');
  console.log('🖼️ Image prompt:', prompt);
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error('No image URL received from DALL-E');
    }

    console.log('✅ Image generated successfully:', imageUrl);
    return imageUrl;
    
  } catch (error) {
    console.error('❌ DALL-E API Error:', error);
    
    // Return a placeholder image if generation fails
    const placeholderUrl = `https://via.placeholder.com/1024x1024/4285f4/ffffff?text=${encodeURIComponent('Image: ' + prompt.substring(0, 30) + '...')}`;
    console.log('⚠️ Using placeholder image:', placeholderUrl);
    return placeholderUrl;
  }
}