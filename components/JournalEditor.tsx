"use client"
import React, { useCallback, useEffect, useRef, memo, useState } from 'react'
import { debounce } from "lodash"
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setIsNewJournalId, setTodaysJournal } from '@/redux/features/journalSlice';
import { analyzeJournal } from '@/utils/llm';
import { Button } from './ui/button';
import Spinner from './Spinner';
import { setIsGenerateAnalyzeClick, setStreamData } from '@/redux/features/motionSlice';

const MemoizedTextArea = memo(({
  defaultValue,
  onChange,
  textRef
}: {
  defaultValue: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  textRef: React.MutableRefObject<HTMLTextAreaElement | null>
}) => (
  <textarea
    ref={textRef}
    defaultValue={defaultValue}
    placeholder='✨ "Start writing your journal... your thoughts, ideas, and memories await."'
    className="w-[calc(40vw)] h-[calc(50vh)] p-5 resize-none overflow-hidden outline-none"
    onChange={onChange}
  />
));

MemoizedTextArea.displayName = 'MemoizedTextArea';

const SavingIndicator = memo(({ isSaving }: { isSaving: boolean }) => (
  isSaving ? <Spinner/> : null
));

SavingIndicator.displayName = 'SavingIndicator';

const JournalEditor = memo(() => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef("");
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useAppDispatch();
  const { isNewJournalId, todaysJournal } = useAppSelector(state => state.journal);
  const { isGenerateAnalyzeClick } = useAppSelector(state => state.motion);

  const handleSave = useCallback(async (value: string) => {
    if (!value.trim() || isSaving) return;
    setIsSaving(true);

    try {
      if (isNewJournalId === null) {
        const response = await fetch("/api/create-journal", {
          method: "POST",
          body: JSON.stringify({ value }),
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        dispatch(setIsNewJournalId(result.data.id));
        dispatch(setTodaysJournal(result.data));
      } else {
        const response = await fetch("/api/edit-journal", {
          method: "PATCH",
          body: JSON.stringify({ content: value, id: isNewJournalId }),
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        // await analyzeJournal(value); //Analyze func
        dispatch(setTodaysJournal(result.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }, [isNewJournalId, isSaving, dispatch]);

  const debouncedSave = useCallback(
    debounce((value: string) => handleSave(value), 1500),
    [handleSave]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    contentRef.current = e.target.value;
    debouncedSave(e.target.value);

  }, [debouncedSave]);

  const handleTodaysJournal = useCallback(async () => {
    try {
      const result = await fetch("/api/todays-journal", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await result.json();

      if (!response || !response.data) return;
      dispatch(setIsNewJournalId(response.data.id ?? null));
      dispatch(setTodaysJournal(response.data));
    } catch (error) {
      console.error("Error fetching today's journal:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleTodaysJournal();
    textRef.current?.focus();
  }, [handleTodaysJournal]);

  const handleClick = async () => {
    // await analyzeJournal(contentRef.current);
    dispatch(setIsGenerateAnalyzeClick());
    // dispatch(setStreamData(output)); //LLM call 

  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <SavingIndicator isSaving={isSaving} />
      <MemoizedTextArea
        defaultValue={todaysJournal?.paragraph || ""}
        onChange={handleChange}
        textRef={textRef}
      />
      { !isGenerateAnalyzeClick && <Button onClick={handleClick}>Generate Analysis</Button>}
    </div>
  );
});

JournalEditor.displayName = 'JournalEditor';

export default JournalEditor;