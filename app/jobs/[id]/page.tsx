import { JobCard } from "@/components/ui/job-card";
import { BackButton } from "@/components/back-button";
import { createClient } from "@/utils/supabase/server";

export default async function JobsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select()
    .eq("id", id)
    .single();

  return (
    <div>
      <BackButton />
      <JobCard job={job} isAdmin={false} isDetail />
    </div>
  );
}
