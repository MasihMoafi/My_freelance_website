// /pages/api/chat.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  // Expecting JSON with model, prompt, and stream
  const { model, prompt, stream } = await req.json();

  try {
    // Use your tunnel URL (update if it changes)
    const tunnelURL = "https://70bc9b42bddd63.lhr.life";
    const response = await fetch(`${tunnelURL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, stream }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch response from Ollama: ${response.statusText}`);
    }

    const data = await response.json();
    // Adjust according to your Ollama response structure
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
