import Hero from "@/components/hero";
import JobList from "@/components/job-list";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { LogIn, FilePlus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 items-center justify-center">
        <JobList />
      </main>
      <footer className="flex-1 flex flex-col gap-6 items-center justify-center">
        <text className="font-medium text-xl gap-2">Hiring?</text>
        {user ? (
          <Link href="/create">
            <Button className="font-medium text-xl gap-2">
              Create a job
              <FilePlus />
            </Button>
          </Link>
        ) : (
          <Link href="/sign-up">
            <Button className="font-medium text-xl gap-2">
              Sign up
              <LogIn />
            </Button>
          </Link>
        )}
      </footer>
    </>
  );
}

//{hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
