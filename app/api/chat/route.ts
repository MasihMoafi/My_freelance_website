import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const tunnelURL = 'https://ee6fcbddaa672e.lhr.life';

    console.log('Forwarding request to:', `${tunnelURL}/api/generate`);
    console.log('Payload:', { model: 'llama3.2', prompt, stream: false });

    const ollamaResponse = await fetch(`${tunnelURL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: prompt,
        stream: false
      })
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error('Ollama endpoint error:', errorText);
      throw new Error(`Ollama error: ${errorText}`);
    }

    const responseData = await ollamaResponse.json();
    console.log('Ollama response data:', responseData);

    return new NextResponse(
      JSON.stringify({ response: responseData.response }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
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
