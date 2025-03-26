import { journalAnalyzeSchema } from "@/utils/schema";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

const modelName = "gpt-4o-mini";

export async function POST(req: Request) {
  
  const { prompt } = await req.json();

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      {
        role: "user",
        content: `Analyze the following journal entry and generate a detailed analysis. Ensure that every field the schema is completed. Do not leave any field empty or omit any category. Journal entry: ${prompt}`,
      },
    ],
    response_format: zodResponseFormat(journalAnalyzeSchema, "journalSchema"),
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        controller.enqueue(new TextEncoder().encode(content));
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}
