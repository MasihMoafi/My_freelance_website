import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    // Call your Hugging Face Space API
    const response = await fetch("https://masihm-what.hf.space/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [message] }), // Hugging Face Spaces expect this format
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch response from Hugging Face Space: ${response.statusText}`);
    }

    const data = await response.json();
    const botResponse = data.data[0]; // Extract the bot's response

    return NextResponse.json({ response: botResponse });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}