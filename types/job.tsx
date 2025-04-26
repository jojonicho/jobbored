export type Job = {
  id: string;
  title: string;
  company_name: string;
  location: string;
  type: "full_time" | "part_time" | "contract";
  description: string;
};
