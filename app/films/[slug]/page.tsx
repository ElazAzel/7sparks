import { notFound } from "next/navigation";
import { FilmDetailPage } from "@/src/components/FilmDetailPage";
import { films } from "@/src/data/festival";

export function generateStaticParams() {
  return films.map(({ slug }) => ({ slug }));
}

export default async function FilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const film = films.find((item) => item.slug === slug);
  if (!film) notFound();
  return <FilmDetailPage film={film} />;
}
