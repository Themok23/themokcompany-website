import { getVentures } from "@/content/ventures";
import VentureClient from "./ventureClient";

export function generateStaticParams() {
  return getVentures().map((v) => ({
    slug: v.slug,
  }));
}

export default async function VentureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <VentureClient slug={slug} />;
}
