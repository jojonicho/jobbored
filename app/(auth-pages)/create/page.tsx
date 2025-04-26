import { createJobAction } from "@/app/actions";
import { JobForm } from "@/components/job/job-form";

export default function CreateJobPage() {
  return <JobForm onSubmit={createJobAction} />;
}
