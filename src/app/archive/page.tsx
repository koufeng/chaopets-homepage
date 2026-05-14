import type { Metadata } from "next";
import { ArchiveView } from "@/views/next/archive-view";

export const metadata: Metadata = {
  title: "档案馆 · 五行小兽",
  description: "五行小兽档案馆：360 度角色展示、包挂盲盒、表情延展与漫画插图。",
};

export default function Page() {
  return <ArchiveView lang="zh" />;
}
