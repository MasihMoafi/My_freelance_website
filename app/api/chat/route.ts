import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const tunnelURL = 'https://cf852666729cf0.lhr.life'; // Moved outside try block

  try {
    const { prompt } = await req.json();

    console.log(`Forwarding to: ${tunnelURL}/api/generate`);
    
    const ollamaResponse = await fetch(`${tunnelURL}/api/generate`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Added CORS header
      },
      body: JSON.stringify({
        model: 'llama3', // Verify exact model name
        prompt,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error('Ollama error:', errorText);
      return new NextResponse(JSON.stringify({ error: errorText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const responseData = await ollamaResponse.json();
    return new NextResponse(
      JSON.stringify({ response: responseData.response }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Server error:', error);
    return new NextResponse(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
