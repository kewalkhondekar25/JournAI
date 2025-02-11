"use client";

import { Flame, Trophy, XCircle } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function JournalingStreakChart() {
  const [streakData, setStreakData] = useState<{ day: number; journaled: number }[]>([]);
  const [streakStats, setStreakStats] = useState({ currentStreak: 0, longestStreak: 0, missedDays: 0 });
  const [journaledPercentage, setJournaledPercentage] = useState(0);

  useEffect(() => {
    // Generate streak data only on the client side to avoid hydration errors
    const generatedData = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      journaled: Math.random() > 0.2 ? 1 : 0, // 80% chance of journaling
    }));

    setStreakData(generatedData);

    // Calculate streak statistics
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let missedDays = 0;

    for (const day of generatedData) {
      if (day.journaled === 1) {
        tempStreak++;
        currentStreak = tempStreak;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
        missedDays++;
      }
    }

    setStreakStats({ currentStreak, longestStreak, missedDays });

    // Calculate percentage of days journaled
    const totalDays = generatedData.length;
    const journaledDays = generatedData.filter((day) => day.journaled === 1).length;
    setJournaledPercentage(Math.round((journaledDays / totalDays) * 100));
  }, []);

  // Radial chart data
  const radialData = [
    { name: "Completed", value: journaledPercentage, fill: "hsl(var(--green-500))" },
  ];

  return (
    <Card className="w-full max-w-[350px]">
      <CardHeader>
        <CardTitle>Journaling Streak</CardTitle>
        <CardDescription>Track your monthly consistency.</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="100%"
            barSize={15}
            data={radialData}
            startAngle={-45} // Start from top
            endAngle={-45 + (journaledPercentage / 100) * 360} // Dynamically fill based on percentage
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar dataKey="value" background cornerRadius={5} />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Centered Percentage Display */}
        <div className="absolute text-center text-lg font-semibold text-primary">
          {journaledPercentage}% <br />
          Completed
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <Flame className="h-4 w-4 text-orange-500" />
          Current Streak: <span className="text-primary">{streakStats.currentStreak} days</span>
        </div>
        <div className="flex gap-2 font-medium leading-none">
          <Trophy className="h-4 w-4 text-yellow-500" />
          Longest Streak: <span className="text-primary">{streakStats.longestStreak} days</span>
        </div>
        <div className="flex gap-2 font-medium leading-none">
          <XCircle className="h-4 w-4 text-red-500" />
          Days Missed: <span className="text-primary">{streakStats.missedDays}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
