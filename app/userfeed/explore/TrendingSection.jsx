import TrendingCarousel from "./TrendingCarousel";

export default function TrendingSection({
  posts,
  loading,
  error,
}) {
  if (loading) {
    return <p>Loading trending posts...</p>;
  }

  if (error) {
    return <p>Failed to load trending posts.</p>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Trending</h2>

      <TrendingCarousel posts={posts} />
    </section>
  );
}