"use client";
import { useState } from "react";
import { z } from "zod";
import { parse } from "partial-json";

import { Input } from "@/components/ui/input";
import { journalAnalyzeSchema } from "@/utils/schema";

export default function SyncPage() {
  const [prompt, setPrompt] = useState("Today was a refreshing day. I took a long walk in the park, enjoying the crisp autumn air and the golden leaves falling around me. The peaceful atmosphere gave me time to reflect on my goals and plans for the coming weeks. I also had a warm cup of coffee at my favorite café, which made the moment even more special. Sometimes, the simplest things bring the most joy");
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<z.infer<typeof journalAnalyzeSchema>>();

  async function handleSubmit() {
    setPrompt("");
    setIsLoading(true);
    setRecipe(undefined);

    const res = await fetch("/api/langchain", {
      method: "POST",
      body: JSON.stringify({ prompt: "Everything went wrong today. I overslept, stubbed my toe, and spilled coffee on my shirt. Traffic was awful, and I missed an important meeting. At lunch, I dropped my food on my shoes, then my computer crashed, wiping out hours of work. As if that wasn’t enough, it poured rain on my way home, and I forgot my keys inside. Standing there, drenched and locked out, I just laughed—because at that point, what else could I do?" }),
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
  }

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
