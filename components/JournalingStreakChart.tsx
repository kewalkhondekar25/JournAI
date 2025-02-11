"use client";

import { Flame, Trophy, XCircle } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";

export function JournalingStreakChart() {
  const [streakStats, setStreakStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    missedDays: 0,
    journaledPercentage: 0,
  });

  useEffect(() => {
    const generatedData = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      journaled: Math.random() > 0.2 ? 1 : 0,
    }));

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

    const journaledDays = generatedData.filter((day) => day.journaled === 1).length;
    const journaledPercentage = Math.round((journaledDays / generatedData.length) * 100);

    setStreakStats({ currentStreak, longestStreak, missedDays, journaledPercentage });
  }, []);

  const chartData = [
    { name: "Completed", value: streakStats.journaledPercentage, fill: "hsl(var(--green-500))" },
  ];

  const chartConfig: ChartConfig = {
    completed: {
      label: "Completion",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="flex flex-col w-full shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Journaling Streak</CardTitle>
        <CardDescription>Track your monthly consistency.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[210px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(streakStats.journaledPercentage / 100) * 360}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid gridType="circle" radialLines={false} stroke="none" polarRadius={[86, 74]} />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {streakStats.journaledPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <Flame className="h-4 w-4 text-orange-500" />
          Current Streak: <span className="text-primary">{streakStats.currentStreak} days</span>
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          <Trophy className="h-4 w-4 text-yellow-500" />
          Longest Streak: <span className="text-primary">{streakStats.longestStreak} days</span>
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          <XCircle className="h-4 w-4 text-red-500" />
          Days Missed: <span className="text-primary">{streakStats.missedDays}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
