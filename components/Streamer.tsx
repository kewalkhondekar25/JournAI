"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { parse } from "partial-json";
import { Input } from "@/components/ui/input";
import { journalAnalyzeSchema } from "@/utils/schema";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios"
import { log } from "node:console";

export default function SyncPage() {

  const [prompt, setPrompt] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<z.infer<typeof journalAnalyzeSchema>>();
  console.log(prompt);
  

  const getTodaysJournal = async () => {

    try {
      setIsLoading(prev => !prev);
      const result = await axios.get("/api/todays-journal");
      const response = await result.data;
      if(!response){
        setErrorMsg("API Error")
      };
      setPrompt(response?.paragraph);
    } catch (error) {
      console.log(error);
      setErrorMsg(error instanceof Error ? error.message : "Unknow Error")
    }
  };

  async function handleSubmit() {
    setPrompt("");
    setIsLoading(true);
    setRecipe(undefined);

    const res = await fetch("/api/langchain", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body?.getReader();
    if (!reader) {
      return {};
    }

    const decoder = new TextDecoder();
    let data = "";
    let parsed = {};
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      data += decoder.decode(value);
      parsed = parse(data);
      setRecipe(parsed as z.infer<typeof journalAnalyzeSchema>);
      console.log(recipe);

    }

    setIsLoading(false);
  };

  useEffect(() => {
    getTodaysJournal();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={prompt}
        disabled={isLoading}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="What recipe do you want?"
      />
      {isLoading && <div>Loading...</div>}
      {/* <RecipeCard recipe={recipe} /> */}
      {recipe && (
        <div className="p-4 border rounded-lg bg-gray-100 w-1/2">
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
    </div>
  );
}
