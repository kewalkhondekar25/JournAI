import { z } from "zod"

// export const parser = StructuredOutputParser.fromZodSchema(z.object({
//   subject: z.string().describe("Based on the content of the journal entry, generate a suitable subject that summarizes its main theme or focus and generate one suitable emoji as well."),
//   summary: z.string().describe("Provide a concise summary of the journal entry, capturing its main ideas and key points and generate one suitable emoji as well."),
//   mood: z.string().describe("Analyze the journal entry and determine the writer's mood based on the tone, emotions, and language used and generate one suitable emoji as well."),
//   emotion: z.string().describe("Analyze the journal entry and determine the predominant emotion expressed. Identify a single, most prominent emotion based on the writer's tone and content and generate one suitable emoji as well."),
//   color: z.string().describe("Determine a vibrant hexadecimal color code that best represents the mood of the journal entry. For example, use #0101fe for a joyful, bright blue representing happiness. Ensure the color is vivid and aligns with the dominant emotion expressed in the entry"),
//   sentimentScore: z.number().describe("Analyze the sentiment of the journal entry and rate it on a scale from -10 to 10, where -10 represents extreme negativity, 0 is completely neutral, and 10 is extremely positive.")
// }));


const journalAnalyzeSchema = z.object({
  "Subject📌": z.string().describe("Analyze the journal and generate a concise and relevant subject that accurately reflects its main theme or topic. Ensure the subject is engaging and includes a suitable emoji that represents the journal's content."),
  "Summary📖": z.string().describe("Analyze the following journal entry and generate a concise and relevant summary that accurately captures its main points. Ensure the summary is clear, engaging, and includes one or more suitable emojis (e.g., 📖, ✍️, 🌟, 🔍, 💡) that best represent the journal's content."),
  "Mood😊": z.string().describe("Analyze the journal entry and determine the writer's mood based on the tone, emotions, and language used"),
  "Emotion💭": z.string().describe("Analyze the journal entry and determine the predominant emotion expressed. Identify a single, most prominent emotion based on the writer's tone and content."),
  "Sentiment🟢": z.string().describe("Analyze the journal's overall sentiment (e.g., highly positive, neutral, or negative). Identify key words that reflect emotions such as relaxation, gratitude, or joy."),
  "EmotionalTone🎭": z.string().describe("Determine the emotional tone of the journal entry (e.g., calm, reflective, appreciative)."),
  "Fortitude🔵": z.string().describe("Assess whether the entry reflects stress, resilience, or emotional regulation.").optional(),
  "Introspection🧠": z.string().describe("Provide observations about how the journal reflects emotional well-being and stress coping strategies.").optional(),
  "Catalyst⚖️": z.string().describe("Evaluate whether the writer maintains a balanced lifestyle based on journal entries.").optional(),
});

export const RecipeSchema = z.object({
  name: z.string().describe("Name of the recipe"),
  ingredients: z
    .array(
      z.object({
        quantity: z.string().describe("quantity of the ingredient"),
        ingredient: z.string().describe("ingredient name"),
      })
    )
    .describe("list of engredients"),
  steps: z
    .array(z.string().describe("markdown content to describe the recipe step"))
    .describe("steps of the recipe"),
});

export {
  journalAnalyzeSchema
}