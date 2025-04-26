import { JobCard } from "@/components/job/job-card";
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
      <div className="flex items-center justify-between mb-4">
        <BackButton />
      </div>
      <JobCard job={job} isAdmin={false} isDetail />
    </div>
  );
}
