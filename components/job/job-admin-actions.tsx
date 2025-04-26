"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";

interface JobActionsProps {
  jobId: string;
  onDelete?: Function;
}

export function JobActions({ jobId, onDelete = () => {} }: JobActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);

      if (error) throw error;
      onDelete();
      toast({
        title: "Successfully deleted job",
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      toast({
        variant: "destructive",
        title: "Error deleting job",
        description: JSON.stringify(error),
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/jobs/${jobId}/edit`)}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Update</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
