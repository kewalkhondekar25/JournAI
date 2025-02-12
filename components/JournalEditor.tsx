"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from "lodash"

const JournalEditor = () => {

  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const savingRef = useRef(false);
  const isCreatedRef = useRef(false);
  const [entry, setEntry] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const debouncedSave = useCallback(debounce( async (value: string) => {

    if (!value.trim() || savingRef.current) return;

    savingRef.current = true;
    setEntry(value);
    setIsSaving(prev => !prev);

    try {
      if(!isCreatedRef.current){
        const response = await fetch("/api/create-journal", {
          method: "POST",
          body: JSON.stringify({ content: value }),
          headers: { "Content-Type": "application/json" },
        });
  
        const result = await response.json();
        isCreatedRef.current = true;
        console.log("Created: ", result);
      }else{
        const response = await fetch("/api/edit-journal", {
          method: "POST",
          body: JSON.stringify({ content: value }),
          headers: { "Content-Type": "application/json" },
        });
  
        const result = await response.json();
        console.log("Updated: ", result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      savingRef.current = false;
      setIsSaving(prev => !prev);
    }
  }, 1500), []);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debouncedSave(e.target.value)
  };

  useEffect(() => {
    textRef.current?.focus();
  }, []);

  return (
    <div className="h-full w-full">
      <textarea
        ref={textRef}
        defaultValue={entry}
        placeholder='✨ "Start writing your journal... your thoughts, ideas, and memories await."'
        className="w-full h-full p-5 outline-none"
        onChange={handleChange}
        />
        {isSaving && <div className="text-sm text-gray-500">Saving...</div>}
    </div>

  )
}

export default JournalEditor