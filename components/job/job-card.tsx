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
import { Job } from "@/types/job";
import { JobActions } from "@/components/job/job-admin-actions";

type CardProps = React.ComponentProps<typeof Card> & {
  job: Job;
  isAdmin?: boolean;
  isDetail?: boolean;
  onDelete?: Function;
};

export const JobCard = ({
  isAdmin = false,
  isDetail = false,
  onDelete = () => {},
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
          <div className="min-w-0 flex-1">
            <CardTitle className={cn(isDetail ? "text-4xl" : "truncate")}>
              {job.title}
            </CardTitle>
            <CardDescription className={cn(!isDetail && "truncate")}>
              {job.company_name}
            </CardDescription>
          </div>
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <JobActions jobId={job.id} onDelete={onDelete} />
            </Button>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin size={12} className="flex-shrink-0" />
            <p className={cn("text-sm font-medium leading-none", !isDetail && "truncate")}>
              {job.location}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dot size={12} className="flex-shrink-0" />
            <p className="text-sm font-medium leading-none">
              {jobTypeEnumToStr(job.type)}
            </p>
          </div>
        </CardContent>
        {isDetail && (
          <CardFooter>
            <div className="flex flex-col w-full">
              <h2 className="font-bold text-2xl">About the job</h2>
              <p className={cn("whitespace-pre-wrap", !isDetail && "truncate")}>
                {job.description}
              </p>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};
