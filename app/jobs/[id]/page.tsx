//import { useRouter, useSearchParams } from "next/navigation";

export default async function JobsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //const router = useRouter();
  //const { id } = router.query;
  const { id } = await params;
  return <div>{id}</div>;
}
