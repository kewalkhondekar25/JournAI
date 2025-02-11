"use client";

import { memo, useMemo } from "react";
import { Smile } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const moodData = [
  { day: "Mon", mood: -0.8 },
  { day: "Tue", mood: -0.2 },
  { day: "Wed", mood: 0.1 },
  { day: "Thu", mood: 0.5 },
  { day: "Fri", mood: 0.9 },
  { day: "Sat", mood: 0.3 },
  { day: "Sun", mood: -0.4 },
];

const LineChartComponent = () => {
  const chartConfig: ChartConfig = useMemo(() => ({
    mood: { label: "Mood Level", color: "hsl(var(--primary))" },
  }), []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mood & Sentiment</CardTitle>
        <CardDescription>Weekly Emotional Analysis</CardDescription>
      </CardHeader>
      <CardContent className="h-[200px]">
        <ChartContainer config={chartConfig} className="max-w-[300px] max-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData} margin={{ left: 12, right: 12, top: 10, bottom: 10 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis domain={[-1, 1]} tickFormatter={(value) => (value > 0 ? "🙂" : value < 0 ? "☹️" : "😐")} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey="mood" type="monotone" stroke="#2563eb" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Mood tracking insights <Smile className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Analyzing your emotional patterns over the past week
        </div>
      </CardFooter>
    </Card>
  );
};

export default memo(LineChartComponent);
