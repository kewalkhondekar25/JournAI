import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from 'next/server';

const model = new ChatOpenAI({ 
  temperature: 0, 
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  if(!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API key not configured" },{ status: 500 });
  };

  try {
    const body = await request.json();
    const { input } = body;

    if(!input) {
      return NextResponse.json({ error: "Prompt is required" },{ status: 400 });
    };

    const result = await model.invoke(input);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to analyze journal" },{ status: 500 });
  }
};