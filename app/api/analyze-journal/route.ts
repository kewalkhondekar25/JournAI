import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from 'next/server';

const model = new ChatOpenAI({
  temperature: 0,
  model: "gpt-4o-mini",
  streaming: true,
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { input } = body;

    if (!input) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const stream = await model.stream([
      new HumanMessage(
        `Analyze this journal entry and structure the response exactly as follows line by line (maintain exact formatting):
        Subject: [subject with emoji]
        Summary: [concise summary with emoji]
        Mood: [mood with emoji]
        Emotion: [predominant emotion with emoji]
        Journal entry: ${input}`
      )
    ]);

    const encoder = new TextEncoder();
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    let buffer = "";
    const processedLines = new Set();

    (async () => {
      try {
        for await (const chunk of stream) {
          let text = typeof chunk.content === "string" ? chunk.content : JSON.stringify(chunk.content);
          buffer += text;

          // Process complete lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || ""; // Keep the last incomplete line in buffer

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine && !processedLines.has(trimmedLine)) {
              processedLines.add(trimmedLine);
              // Clean up the line
              const cleanedLine = trimmedLine
                .replace(/\s+/g, ' ')  // Fix multiple spaces
                .replace(/(\w+)\s+-\s+(\w+)/g, '$1$2')  // Fix split words
                .trim();

              await writer.write(encoder.encode(cleanedLine + '\n'));
            }
          }
        }

        // Process any remaining content in buffer
        if (buffer.trim()) {
          const cleanedLine = buffer.trim()
            .replace(/\s+/g, ' ')
            .replace(/(\w+)\s+-\s+(\w+)/g, '$1$2');
          if (!processedLines.has(cleanedLine)) {
            await writer.write(encoder.encode(cleanedLine + '\n'));
          }
        }

        await writer.close();
      } catch (error) {
        console.error("Streaming error:", error);
        await writer.abort(error);
      }
    })();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to analyze journal" }, { status: 500 });
  }
}