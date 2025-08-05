# 🎓 AI Visual Lesson Builder

> "Give me a concept — I'll give you a narrated visual story."

A modern React application that transforms any topic into an engaging visual lesson with AI-generated images and narration.

## ✨ Features

- **AI-Powered Content Generation**: Uses GPT-4 to break down concepts into clear, progressive steps
- **Visual Learning**: Generates unique images for each lesson step using DALL-E 3
- **Audio Narration**: Creates custom voiceovers using ElevenLabs text-to-speech
- **Interactive UI**: Modern, responsive interface with lesson timeline and audio controls
- **Customizable**: Adjustable age level and difficulty settings

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API keys for OpenAI and ElevenLabs

### API Keys Required

You'll need the following API keys:

1. **OpenAI API Key** (for GPT-4 and DALL-E 3)
   - Sign up at: https://platform.openai.com/
   - Get API key from: https://platform.openai.com/api-keys
   - Used for: Lesson content generation and image creation

2. **ElevenLabs API Key** (for text-to-speech)
   - Sign up at: https://elevenlabs.io/
   - Get API key from: https://elevenlabs.io/app/voice-lab
   - Used for: Audio narration generation

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-visual-lesson-builder
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../backend
   cp .env.example .env
   ```
   
   Edit `.env` file and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   PORT=3001
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   
   The API will be available at `http://localhost:3001`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   
   The app will be available at `http://localhost:3000`

## 🎯 How to Use

1. **Enter a Topic**: Type any concept you want to learn about (e.g., "Photosynthesis", "Binary Search", "How Volcanoes Form")

2. **Choose Settings**: 
   - Select age level (Elementary, Middle School, High School, College)
   - Pick difficulty (Beginner, Intermediate, Advanced)

3. **Generate Lesson**: Click "Generate Visual Lesson" and wait for AI to create your content

4. **Learn**: Navigate through your custom lesson with:
   - Visual images for each step
   - Audio narration
   - Interactive timeline
   - Step-by-step progression

## 🏗️ Architecture

```
[React Frontend] ←→ [Express Backend] ←→ [AI Services]
                                           ├── OpenAI GPT-4 (Content)
                                           ├── DALL-E 3 (Images)
                                           └── ElevenLabs (Audio)
```

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- CSS3 with modern styling
- Responsive design

**Backend:**
- Node.js with Express
- TypeScript
- OpenAI API integration
- ElevenLabs API integration

## 📁 Project Structure

```
ai-visual-lesson-builder/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main app component
│   └── package.json
├── backend/                 # Express API server
│   ├── src/
│   │   ├── services/       # AI integration services
│   │   ├── types/          # TypeScript interfaces
│   │   └── index.ts        # Main server file
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Customizing AI Behavior

**Backend Configuration** (`backend/src/services/openaiService.ts`):
- Adjust GPT-4 prompts for different lesson styles
- Modify temperature for more/less creative responses
- Change max tokens for longer/shorter content

**Image Generation** (`backend/src/services/imageService.ts`):
- Switch between DALL-E models
- Adjust image size and quality
- Customize image style prompts

**Audio Settings** (`backend/src/services/ttsService.ts`):
- Change voice ID for different narrators
- Adjust voice settings (stability, similarity)
- Switch TTS models

## 🚨 Important Notes

### Cost Considerations

- **OpenAI**: GPT-4 and DALL-E 3 are paid APIs
  - GPT-4: ~$0.03-0.06 per lesson (depending on length)
  - DALL-E 3: ~$0.04 per image
  - Total cost per lesson: ~$0.15-0.30

- **ElevenLabs**: Text-to-speech pricing
  - ~$0.18 per 1,000 characters
  - Average lesson: ~$0.05-0.15

### Rate Limits

- OpenAI: Rate limits apply based on your tier
- ElevenLabs: Free tier has monthly character limits
- Consider implementing queuing for high-volume usage

### Audio Files

- Audio files are stored locally in `backend/audio/`
- In production, consider using cloud storage (S3, CloudFlare, etc.)
- Current implementation serves files directly from Express

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript
npm start        # Start production server
```

**Frontend:**
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

### API Endpoints

- `POST /api/generate-lesson` - Generate a new lesson
- `GET /api/health` - Health check
- `GET /audio/:filename` - Serve audio files

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **API Key Errors**: Make sure your `.env` file is in the `backend/` directory with valid API keys

2. **CORS Issues**: The backend includes CORS middleware for local development

3. **Audio Not Playing**: Check browser console for errors and ensure audio files are being served correctly

4. **Slow Generation**: AI APIs can take 30-60 seconds for complex lessons

5. **Image Generation Fails**: DALL-E has content policy restrictions; prompts are automatically adjusted

### Getting Help

- Check the browser console for frontend errors
- Check the backend logs for API issues
- Verify your API keys are valid and have sufficient credits
- Ensure all dependencies are installed correctly

---

Happy learning! 🎉
