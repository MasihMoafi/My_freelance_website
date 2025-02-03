import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json(); // Expecting a JSON with "prompt"
    const tunnelURL = 'https://f518062065778e.lhr.life'; // Your tunnel URL

    const ollamaResponse = await fetch(`${tunnelURL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2', // Verified model name format
        prompt: prompt,
        stream: false
      })
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      throw new Error(`Ollama error: ${errorText}`);
    }

    const responseData = await ollamaResponse.json();

    return new NextResponse(
      JSON.stringify({ response: responseData.response }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Add CORS header if needed
        }
      }
    );
  } catch (error: any) {
    console.error('Chat error:', error);
    return new NextResponse(
      JSON.stringify({ error: error.message || 'Failed to process request' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}
