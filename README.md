# Multimodal Website with Gemma 3 12B

A modern website featuring an AI assistant powered by Gemma 3 12B, capable of multimodal interactions including image and text inputs with internet search capabilities.

## Features

- AI assistant powered by Gemma 3 12B
- Text-to-Speech output using KokoroTTS
- Image processing capabilities
- Internet search functionality
- Responsive and modern UI with light/dark modes

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Ollama](https://ollama.com/) for running Gemma 3 12B locally
- Sufficient GPU resources to run Gemma 3 12B (min. 12GB VRAM recommended)

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd My_freelance_website
```

2. **Install dependencies**

```bash
npm install
```

3. **Pull the Gemma 3 12B model using Ollama**

```bash
ollama pull gemma3:12b
```

4. **Start Ollama service**

```bash
ollama serve
```

5. **Start the development server**

```bash
npm run dev
```

Alternatively, you can use the provided run script which handles everything for you:

```bash
chmod +x run.sh
./run.sh
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the website in action.

## Using the AI Assistant

1. Click the AI assistant button in the bottom right corner of the website
2. You can:
   - Type text messages
   - Upload images for analysis
   - Toggle search mode to search the internet for information
   - Enable/disable text-to-speech

## API Endpoints

- `/api/chat` - Main chat endpoint
- `/api/analyze-image` - Image analysis using Gemma 3 12B
- `/api/owl-search` - Internet search functionality
- `/api/kokoro-tts` - Text-to-speech synthesis

## Troubleshooting

### Model Loading Issues

If you encounter issues loading the Gemma 3 12B model, try:

```bash
ollama rm gemma3:12b
ollama pull gemma3:12b
```

### Search Not Working

The search functionality requires internet access. If search is not working:

1. Check your internet connection
2. Verify the API endpoints are returning data correctly
3. Check browser console for any error messages

## License

This project is licensed under the MIT License
