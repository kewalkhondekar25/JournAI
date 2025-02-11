"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputComponent() {
  const placeholders = [
    "Ask AI: How was my day yesterday?",
    "Ask AI: What’s one thing I learned about myself this week?",
    "Ask AI: How did my emotions change throughout the day?",
    "Ask AI: What are three things I’m grateful for today?",
    "Ask AI: What’s one small habit I can start to improve my well-being?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="flex justify-center items-center h-full">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
