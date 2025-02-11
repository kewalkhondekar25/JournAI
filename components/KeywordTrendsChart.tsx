"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

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

const chartData = [
  { topic: "Gym", mentions: 14, fill: "hsl(var(--chart-1))" },
  { topic: "Work stress", mentions: 10, fill: "hsl(var(--chart-2))" },
  { topic: "Vacation", mentions: 6, fill: "hsl(var(--chart-3))" },
  { topic: "Sleep", mentions: 8, fill: "hsl(var(--chart-4))" },
  { topic: "Family", mentions: 12, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  mentions: {
    label: "Mentions",
  },
  gym: {
    label: "Gym",
    color: "hsl(var(--chart-1))",
  },
  workStress: {
    label: "Work Stress",
    color: "hsl(var(--chart-2))",
  },
  vacation: {
    label: "Vacation",
    color: "hsl(var(--chart-3))",
  },
  sleep: {
    label: "Sleep",
    color: "hsl(var(--chart-4))",
  },
  family: {
    label: "Family",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function KeywordTrendsChart() {
  return (
    <Card className="flex flex-col w-full shadow-md">
      <CardHeader>
        <CardTitle>Bar Chart - Mentions</CardTitle>
        <CardDescription>Topics discussed the most</CardDescription>
      </CardHeader>
      <CardContent className="h-[225px]">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="topic"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value.toLowerCase().replace(" ", "") as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="mentions" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="mentions" radius={5}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total mentions for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
