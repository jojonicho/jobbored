import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { JobForm } from "@/components/job/job-form";
import { updateJobAction } from "@/app/actions";
import { Job } from "@/types/job";

export default async function JobDetailUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { id } = await params;
  const { data: job } = await supabase
    .from("jobs")
    .select()
    .eq("id", id)
    .single();

  if (user.id !== job.user_id) {
    return redirect("/me");
  }

  return (
    <JobForm
      initialData={job}
      onSubmit={updateJobAction.bind(null, id)}
    />
  );
}
