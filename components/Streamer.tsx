"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/hooks";

// const streamJournalAnalysis = async (
//   input: string,
//   setOutput: React.Dispatch<React.SetStateAction<string[]>>
// ) => {
//   try {
//     const response = await fetch("/api/analyze-journal", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ input }),
//     });

//     if (!response.body) return;

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
    
//     let pendingText = "";
//     let wordsQueue: string[] = [];

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       const chunk = decoder.decode(value, { stream: true });
//       pendingText += chunk; 

//       // Split properly into words
//       let words = pendingText.split(/\s+/);
//       pendingText = words.pop() || ""; // Keep last word if incomplete

//       // Remove duplicate words by checking the last output word
//       words = words.filter((word, index, arr) => word !== arr[index - 1]);

//       // Remove unnecessary ** formatting
//       words = words.map(word => word.replace(/\*\*(.*?)\*\*/g, "$1"));

//       // Display words one by one
//       for (let word of words) {
//         setOutput((prev) => [...prev, word]);
//         await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust speed
//       }
//     }

//     // Append leftover word if any
//     if (pendingText.trim()) {
//       let formattedWord = pendingText.replace(/\*\*(.*?)\*\*/g, "$1");
//       setOutput((prev) => [...prev, formattedWord]);
//     }

//   } catch (error) {
//     console.error("AI Analysis Error:", error);
//   }
// };

const streamJournalAnalysis = async (
  input: string,
  setOutput: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const response = await fetch("/api/analyze-journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    let pendingText = "";
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      let chunk = decoder.decode(value, { stream: true });
      pendingText += chunk;

      // Look for full sentences or newlines
      let sentences = pendingText.split(/\n|\. /);
      pendingText = sentences.pop() || ""; // Keep last incomplete sentence

      for (let sentence of sentences) {
        setOutput((prev) => [...prev, sentence.trim()]);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    // If any remaining content
    if (pendingText.trim()) {
      setOutput((prev) => [...prev, pendingText.trim()]);
    }

  } catch (error) {
    console.error("AI Analysis Error:", error);
  }
};


const Streamer = () => {
  const [output, setOutput] = useState<string[]>([]);
  const { paragraph } = useAppSelector((state) => state.journal.todaysJournal);
  const { isGenerateAnalyzeClick } = useAppSelector((state) => state.motion);

  const handleAnalyze = () => {
    if (!paragraph) return;
    setOutput([]);
    streamJournalAnalysis(paragraph, setOutput);
  };

  useEffect(() => {
    if (isGenerateAnalyzeClick) {
      setTimeout(() => {
        handleAnalyze();
      }, 2000);
    }
  }, [isGenerateAnalyzeClick]);

  return (
    <div className="relative w-full">
      <div>
        {output.length > 0
          ? output.map((word, index) => (
              <span key={index} className="animate-typing mr-1">
                {word}{" "}
              </span>
            ))
          : "Streaming output will appear here..."}
      </div>
      <Button className="absolute bottom-0">Back</Button>
    </div>
  );
};

export default Streamer;
