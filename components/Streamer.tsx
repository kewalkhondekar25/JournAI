"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { parse } from "partial-json";
import { journalAnalyzeSchema } from "@/utils/schema";
import axios from "axios"
import { Button } from "./ui/button";

export default function SyncPage() {

  const [prompt, setPrompt] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<z.infer<typeof journalAnalyzeSchema>>();
  const hasFetched = useRef(false);

  const getTodaysJournal = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get("/api/todays-journal");
      const response = await result.data;
      if(!response){
        return ("API Error");
      };
      setPrompt(response.data.paragraph);
      await handleSubmit(response.data.paragraph);
    } catch (error) {
      console.log(error);
      setErrorMsg(error instanceof Error ? error.message : "Unknow Error")
    }
  };

  async function handleSubmit(currentPrompt: string) {
    setRecipe(undefined);

    const res = await fetch("/api/langchain", {
      method: "POST",
      body: JSON.stringify({ prompt: currentPrompt }),
    });

    const reader = res.body?.getReader();
    if (!reader) {
      return {};
    }

    const decoder = new TextDecoder();
    let data = "";
    let parsed: Record<string, any> = {};
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      data += decoder.decode(value);
      parsed = parse(data);
      setRecipe(parsed as z.infer<typeof journalAnalyzeSchema>);
    }

    const subject = parsed["Subject📌"] || "Unknown Subject";
    const score = parsed["Sentiment Score📈"] || "No Score";

    console.log("Subject:", subject);
    console.log("Sentiment Score:", score);
    setIsLoading(false);
    
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getTodaysJournal();
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-3">
      {isLoading && <div>Loading...</div>}
      {recipe && (
        <div className="p-4 border rounded-lg bg-gray-100 w-full">
          <dl>
            {Object.entries(recipe).map(([key, value]) => (
              <div key={key} className="mb-2">
                <dt className="font-medium">{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {recipe && <Button className="w-12">Back</Button>}
    </div>
  );
}
