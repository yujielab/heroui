"use client";

import type {ButtonProps, CardProps} from "@heroui/react";

import React from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import {
  Card,
  Button,
  Select,
  SelectItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@heroui/react";
import {Icon} from "@iconify/react";

type ChartData = {
  weekday: string;
  [key: string]: string | number;
};

type BarChartProps = {
  title: string;
  value: string;
  unit?: string;
  color: ButtonProps["color"];
  categories: string[];
  chartData: ChartData[];
};

const data: BarChartProps[] = [
  {
    title: "Avg. Energy Activity",
    value: "580/280",
    unit: "kcal",
    categories: ["Low", "Medium", "High"],
    color: "warning",
    chartData: [
      {
        weekday: "Mon",
        Low: 120,
        Medium: 280,
        High: 180,
      },
      {
        weekday: "Tue",
        Low: 150,
        Medium: 320,
        High: 220,
      },
      {
        weekday: "Wed",
        Low: 180,
        Medium: 250,
        High: 150,
      },
      {
        weekday: "Thu",
        Low: 140,
        Medium: 290,
        High: 180,
      },
      {
        weekday: "Fri",
        Low: 160,
        Medium: 270,
        High: 190,
      },
      {
        weekday: "Sat",
        Low: 130,
        Medium: 240,
        High: 210,
      },
      {
        weekday: "Sun",
        Low: 170,
        Medium: 300,
        High: 240,
      },
    ],
  },
  {
    title: "Avg. Heart Rate",
    value: "72/52",
    unit: "bpm",
    categories: ["Low", "High"],
    color: "danger",
    chartData: [
      {
        weekday: "Mon",
        Low: 65,
        High: 85,
      },
      {
        weekday: "Tue",
        Low: 62,
        High: 82,
      },
      {
        weekday: "Wed",
        Low: 68,
        High: 88,
      },
      {
        weekday: "Thu",
        Low: 64,
        High: 84,
      },
      {
        weekday: "Fri",
        Low: 66,
        High: 86,
      },
      {
        weekday: "Sat",
        Low: 63,
        High: 83,
      },
      {
        weekday: "Sun",
        Low: 67,
        High: 87,
      },
    ],
  },
  {
    title: "Avg. Daily Steps",
    value: "8,432",
    unit: "steps",
    categories: ["Low", "Medium", "High"],
    color: "success",
    chartData: [
      {
        weekday: "Mon",
        Low: 2500,
        Medium: 4000,
        High: 6500,
      },
      {
        weekday: "Tue",
        Low: 3000,
        Medium: 4500,
        High: 7000,
      },
      {
        weekday: "Wed",
        Low: 2800,
        Medium: 4200,
        High: 6800,
      },
      {
        weekday: "Thu",
        Low: 3200,
        Medium: 4800,
        High: 7200,
      },
      {
        weekday: "Fri",
        Low: 2700,
        Medium: 4100,
        High: 6400,
      },
      {
        weekday: "Sat",
        Low: 2000,
        Medium: 3500,
        High: 5500,
      },
      {
        weekday: "Sun",
        Low: 1800,
        Medium: 3200,
        High: 5000,
      },
    ],
  },
];

export default function Component() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {data.map((item, index) => (
        <BarChartCard key={index} {...item} />
      ))}
    </dl>
  );
}

const formatWeekday = (weekday: string) => {
  const day =
    {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
      Sun: 0,
    }[weekday] ?? 0;

  return new Intl.DateTimeFormat("en-US", {weekday: "long"}).format(new Date(2024, 0, day));
};

const BarChartCard = React.forwardRef<HTMLDivElement, Omit<CardProps, "children"> & BarChartProps>(
  ({className, title, value, unit, categories, color, chartData, ...props}, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("h-[300px] border border-transparent dark:border-default-100", className)}
        {...props}
      >
        <div className="flex flex-col gap-y-2 p-4">
          <div className="flex items-center justify-between gap-x-2">
            <dt>
              <h3 className="text-small font-medium text-default-500">{title}</h3>
            </dt>
            <div className="flex items-center justify-end gap-x-2">
              <Select
                aria-label="Time Range"
                classNames={{
                  trigger: "min-w-[100px] min-h-7 h-7",
                  value: "text-tiny !text-default-500",
                  selectorIcon: "text-default-500",
                  popoverContent: "min-w-[120px]",
                }}
                defaultSelectedKeys={["per-day"]}
                listboxProps={{
                  itemClasses: {
                    title: "text-tiny",
                  },
                }}
                placeholder="Per Day"
                size="sm"
              >
                <SelectItem key="per-day">Per Day</SelectItem>
                <SelectItem key="per-week">Per Week</SelectItem>
                <SelectItem key="per-month">Per Month</SelectItem>
              </Select>
              <Dropdown
                classNames={{
                  content: "min-w-[120px]",
                }}
                placement="bottom-end"
              >
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <Icon height={16} icon="solar:menu-dots-bold" width={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  itemClasses={{
                    title: "text-tiny",
                  }}
                  variant="flat"
                >
                  <DropdownItem key="view-details">View Details</DropdownItem>
                  <DropdownItem key="export-data">Export Data</DropdownItem>
                  <DropdownItem key="set-alert">Set Alert</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <dd className="flex items-baseline gap-x-1">
            <span className="text-3xl font-semibold text-default-900">{value}</span>
            <span className="text-medium font-medium text-default-500">{unit}</span>
          </dd>
        </div>

        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-none"
          height="100%"
          width="100%"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 14,
              left: -8,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="weekday"
              style={{fontSize: "var(--heroui-font-size-tiny)"}}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              style={{fontSize: "var(--heroui-font-size-tiny)"}}
              tickLine={false}
            />
            <Tooltip
              content={({label, payload}) => (
                <div className="flex h-auto min-w-[120px] items-center gap-x-2 rounded-medium bg-background p-2 text-tiny shadow-small">
                  <div className="flex w-full flex-col gap-y-1">
                    <span className="font-medium text-foreground">{formatWeekday(label)}</span>
                    {payload?.map((p, index) => {
                      const name = p.name;
                      const value = p.value;
                      const category = categories.find((c) => c.toLowerCase() === name) ?? name;

                      return (
                        <div key={`${index}-${name}`} className="flex w-full items-center gap-x-2">
                          <div
                            className="h-2 w-2 flex-none rounded-full"
                            style={{
                              backgroundColor: `hsl(var(--heroui-${color}-${(index + 1) * 200}))`,
                            }}
                          />
                          <div className="flex w-full items-center justify-between gap-x-2 pr-1 text-xs text-default-700">
                            <span className="text-default-500">{category}</span>
                            <span className="font-mono font-medium text-default-700">{value}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              cursor={false}
            />
            {categories.map((category, index) => (
              <Bar
                key={`${category}-${index}`}
                animationDuration={450}
                animationEasing="ease"
                barSize={24}
                dataKey={category}
                fill={`hsl(var(--heroui-${color}-${(index + 1) * 200}))`}
                radius={index === categories.length - 1 ? [4, 4, 0, 0] : 0}
                stackId="bars"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>

        <div className="flex w-full justify-center gap-4 pb-4 text-tiny text-default-500">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: `hsl(var(--heroui-${color}-${(index + 1) * 200}))`,
                }}
              />
              <span className="capitalize">{category}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  },
);

BarChartCard.displayName = "BarChartCard";
