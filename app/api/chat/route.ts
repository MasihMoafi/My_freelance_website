import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const tunnelURL = 'https://6db11a39669c73.lhr.life';
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 180000); // 3-minute timeout

  try {
    const { prompt } = await req.json();
    
    const ollamaResponse = await fetch(`${tunnelURL}/api/generate`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        model: 'llama3.2', // Verify exact model name
        prompt,
        stream: true, // Enable streaming
      }),
    });

    clearTimeout(timeoutId);

    if (!ollamaResponse.ok) {
      const errorData = await ollamaResponse.json();
      console.error('Ollama Error Details:', errorData);
      throw new Error(`Ollama API Error: ${errorData.error}`);
    }

    // Stream handling
    const reader = ollamaResponse.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      fullResponse += decoder.decode(value);
    }

    return new NextResponse(
      JSON.stringify({ response: fullResponse }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error('Full Error Trace:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: error.name === 'AbortError' 
          ? 'Request timed out after 3 minutes' 
          : error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
