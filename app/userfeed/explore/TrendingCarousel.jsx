"use client";

import TrendingCard from "./TrendingCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function TrendingCarousel({ posts = [] }) {
  const trendingItems = posts.map((post) => ({
    id: post.id,
    type: post.type,

    // Backend uses caption
    title: post.caption,

    // First uploaded media or fallback image
    cover:
      post.media && post.media.length > 0
        ? post.media[0].url
        : "/placeholder.webp",

    // Author profile picture
    profile: post.author?.picture || "/default-avatar.png",

    // Handle users with either name or firstName/lastName
    author:
      post.author?.name ||
      `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim() ||
      "Unknown User",

    // Your backend doesn't return views, so use engagement score
    views: post.engagement_score,

    // Total engagement
    engagement:
      (post.likes?.count || 0) +
      (post.comments?.count || 0) +
      (post.saves?.count || 0),

    // Backend field
    createdAt: post.created_at,

    // Extra fields in case TrendingCard wants them later
    likes: post.likes?.count || 0,
    comments: post.comments?.count || 0,
    saves: post.saves?.count || 0,
    sport: post.sport,
    hasLiked: post.hasLiked,
    hasSaved: post.hasSaved,
    userId: post.user_id,
    authorData: post.author,
    media: post.media,
  }));

  if (!trendingItems.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No trending posts found.
      </div>
    );
  }

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="gap-2">
        {trendingItems.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <TrendingCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}