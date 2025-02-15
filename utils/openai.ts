import { OpenAI } from "openai";

let openAIClient: OpenAI | null = null;

const getOpenAIClient = () => {
  if(!openAIClient){
    openAIClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  };
  return openAIClient;
};


export default getOpenAIClient;