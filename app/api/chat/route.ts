import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { prompt } = await req.json();
    // Use the tunnel URL if provided, otherwise default to localhost (for local testing)
    const tunnelURL = process.env.TUNNEL_URL || 'http://localhost:3000';
    const targetURL = `${tunnelURL}/api/generate`;

    console.log(`Forwarding request to: ${targetURL}`);
    console.log('Payload:', { model: 'llama3.2', prompt, stream: false });

    const ollamaResponse = await fetch(targetURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt,
        stream: false,
      }),
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
          'Access-Control-Allow-Origin': '*',
        },
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
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
