"use client";

import { MapPin, Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { jobTypeEnumToStr } from "@/utils/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { Job } from "@/types/job";

type CardProps = React.ComponentProps<typeof Card> & {
  job: Job;
  isAdmin?: boolean;
  isDetail?: boolean;
};

export const JobCard = ({
  isAdmin = false,
  isDetail = false,
  job,
  className,
  ...props
}: CardProps) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card
        className={cn(
          "w-[380px] hover:border-gray-500",
          isDetail && "w-full",
          className,
        )}
        {...props}
      >
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className={cn(isDetail && "text-4xl")}>
              {job.title}
            </CardTitle>
            <CardDescription>{job.company_name}</CardDescription>
          </div>
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <EllipsisVertical />
            </Button>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <MapPin />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{job.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Dot />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {jobTypeEnumToStr(job.type)}
              </p>
            </div>
          </div>
        </CardContent>
        {isDetail && (
          <CardFooter>
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl">About the job</h2>
              <text>{job.description}</text>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};
