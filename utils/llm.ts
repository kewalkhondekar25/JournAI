import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(z.object({
  subject: z.string().describe("Based on the content of the journal entry, generate a suitable subject that summarizes its main theme or focus."),
  summary: z.string().describe("Provide a concise summary of the journal entry, capturing its main ideas and key points."),
  mood: z.string().describe("Analyze the journal entry and determine the writer's mood based on the tone, emotions, and language used."),
  emotion: z.string().describe("Analyze the journal entry and determine the predominant emotion expressed. Identify a single, most prominent emotion based on the writer's tone and content."),
  color: z.string().describe("Determine a vibrant hexadecimal color code that best represents the mood of the journal entry. For example, use #0101fe for a joyful, bright blue representing happiness. Ensure the color is vivid and aligns with the dominant emotion expressed in the entry."),
  sentimentScore: z.number().describe("Analyze the sentiment of the journal entry and rate it on a scale from -10 to 10, where -10 represents extreme negativity, 0 is completely neutral, and 10 is extremely positive.")
}));

const getPrompt = async (content: string) => {

  const formattedInstruction = parser.getFormatInstructions();
  
  const prompt = new PromptTemplate({
    template: "Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{formattedInstruction}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: {formattedInstruction}
  });

  const input = await prompt.format({
    entry: content
  });

  console.log(input);
  return input;
}

const analyzeJournal = async (content: string) => {
  try {
    const input = await getPrompt(content)
    const result = await fetch('/api/analyze-journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });

    if(!result.ok) {
      const error = await result.json();
      throw new Error(error.message || "API call failed");
    };
    
    const response = await result.json();
    console.log("API Response:", response);
    const data = await parser.parse(response.kwargs.content);
    console.log(data);
    return data;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze journal");
  }
};

export { analyzeJournal };