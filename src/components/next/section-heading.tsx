import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: HeadingTag;
}) {
  const Tag = as;
  return (
    <header className={cn("section-heading fade-up", `align-${align}`)}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag className="title">{title}</Tag>
      {description ? <p className="desc">{description}</p> : null}
    </header>
  );
}
