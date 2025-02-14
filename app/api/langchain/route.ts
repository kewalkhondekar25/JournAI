import { CommaSeparatedListOutputParser, StringOutputParser } from "@langchain/core/output_parsers"
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

const model = new ChatOpenAI({
  temperature: 0,
  model: "gpt-4o-mini",
  openAIApiKey: process.env.OPENAI_API_KEY
})

export const POST = async (req: Request) => {

  try {
    const { input } = await req.json();
    console.log(input);
    
  
    if(!input){
      return NextResponse.json({
        message: "Request body is required"
      }, { status: 400 })
    };

    // const callStringOutputParser = async () => {
    //   //prompt template
    //   const prompt = ChatPromptTemplate.fromMessages([
    //     ["system", "Generate a joke based on word provided by user"],
    //     ["human", `${animal}`]
    //   ]);
      
    //   //create parser
    //   const parser = new StringOutputParser();
      
    //   //create chain
    //   const chain = prompt.pipe(model).pipe(parser);
      
    //   //call chain
    //   return await chain.invoke({
    //     animal: animal
    //   })
    // };

    const callListOutputParser = async () => {

      const prompt = ChatPromptTemplate.fromTemplate("Provide 5 different types, seperated by commas, for following word {fruit}");

      const outputParser = new CommaSeparatedListOutputParser();

      const chain = prompt.pipe(model).pipe(outputParser);

      return await chain.invoke({
        fruit: `${input}`
      })

    }
  
    // const response = await model.invoke("hi");
    // const response = await callStringOutputParser();
    const response = await callListOutputParser();
    console.log(response);

    if(!response){
      return NextResponse.json({
        message: "Failed to generate message"
      }, { status: 500 });
    };

    return NextResponse.json({
      message: "Message generated Successfully",
      response
    }, { status: 200});

  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown Error" 
    }, { status: 500});
  }
};