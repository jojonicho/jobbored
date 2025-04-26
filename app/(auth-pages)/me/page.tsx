import Link from "next/link";
import JobList from "@/components/job-list";
import { createClient } from "@/utils/supabase/server";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function MePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <div className="flex w-full justify-between">
          <h2 className="font-bold text-2xl mb-4">Your jobs</h2>
          <Link href="/create">
            <Button className="font-medium gap-1">
              Create a job
              <Plus />
            </Button>
          </Link>
        </div>
        <JobList isAdmin />
      </div>
    </div>
  );
}
