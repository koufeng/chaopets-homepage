import type { Metadata } from "next";
import { ArchiveView } from "@/views/next/archive-view";

export const metadata: Metadata = {
  title: "Archive · Wǔ Xíng Beasts",
  description: "Wǔ Xíng Beasts archive: 360-degree portraits, blind box pendants, emoticons, and illustrations.",
};

export default function Page() {
  return <ArchiveView lang="en" />;
}
