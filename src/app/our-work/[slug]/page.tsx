import { getCaseStudies } from "@/content/portfolio";
import CaseStudyClient from "./caseStudyClient";

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyClient slug={slug} />;
}
