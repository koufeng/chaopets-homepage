import { notFound } from "next/navigation";
import { BeastDetailView } from "@/views/next/beast-detail-view";
import { beasts, isBeastId } from "@/data/beasts";

export function generateStaticParams() {
  return beasts.map((b) => ({ id: b.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isBeastId(id)) notFound();
  return <BeastDetailView lang="en" beastId={id} />;
}
