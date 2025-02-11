"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Emotion Breakdown Data
const emotionData = [
  { emotion: "Joy", percentage: 30, color: "#ff7f50" }, // Coral 🍊
  { emotion: "Stress", percentage: 25, color: "#ff4757" }, // Red 😓
  { emotion: "Calm", percentage: 20, color: "#1e90ff" }, // Dodger Blue 😌
  { emotion: "Sadness", percentage: 15, color: "#3742fa" }, // Blue 😞
  { emotion: "Others", percentage: 10, color: "#2ed573" }, // Green 🤔
];

const chartConfig = {
  percentage: { label: "Percentage" },
  Joy: { label: "Joy", color: "#ff7f50" },
  Stress: { label: "Stress", color: "#ff4757" },
  Calm: { label: "Calm", color: "#1e90ff" },
  Sadness: { label: "Sadness", color: "#3742fa" },
  Others: { label: "Others", color: "#2ed573" },
} satisfies ChartConfig;

export function EmotionBreakdownChart() {
  return (
    <Card className="flex flex-col w-[320px] shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base">Emotion Breakdown</CardTitle>
        <CardDescription className="text-xs">Past Week/Month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]" // Increased height
        >
          <PieChart width={250} height={250}> {/* Increased PieChart size */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={emotionData} dataKey="percentage" nameKey="emotion">
              {emotionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-xs">
        <div className="flex items-center gap-1 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-muted-foreground">
          Last 7-30 days emotion records
        </div>
      </CardFooter>
    </Card>
  );
}
