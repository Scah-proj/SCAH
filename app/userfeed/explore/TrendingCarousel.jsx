"use client";

import TrendingCard from "./TrendingCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const mockTrending = [
  {
    id: 1,
    type: "post",
    title: "How to get scouted in Nigeria",
    cover: "/coach.webp",
    profile: "/wen.webp",
    author: "Coach Timi",
    views: 1200,
    engagement: 340,
    createdAt: "2026-02-01T18:30:00.000Z"
  },
  {
    id: 2,
    type: "tryout",
    title: "U17 Football Tryout",
    cover: "/balll.webp",
    profile: "/coa.webp",
    club: "Barcelona Academy Lagos",
    views: 890,
    applications: 120,
    createdAt: "2026-02-04T18:30:00.000Z"
  },
  {
    id: 3,
    type: "post",
    title: "Top drills for midfielders",
    cover: "/foa.webp",
    profile: "/roa.webp",
    author: "Elite Trainer",
    views: 670,
    engagement: 210,
    createdAt: "2026-02-06T18:30:00.000Z"
  },
  {
    id: 4,
    type: "post",
    title: "Liverpool FC Academy Open Trial",
    cover: "/ath.webp",
    profile: "/roa.webp",
    author: "Liverpool FC Academy",
    views: "5.8k",
    applications: 394,
    createdAt: "2026-02-06T18:30:00.000Z"
  },
  {
    id: 5,
    type: "post",
    title: "Analysis: Rising Attacker from Nigeria",
    cover: "/america.webp",
    profile: "/roa.webp",
    author: "Ryan Connors",
    views: 4700,
    engagement: 271,
    createdAt: "2026-02-06T18:30:00.000Z"
  },
  {
    id: 6,
    type: "post",
    title: "Samuel Wahyu Highlight Reel",
    cover: "/amerball.webp",
    profile: "/roa.webp",
    author: "Samuel Wahyu",
    views: 6400,
    engagement: 438,
    createdAt: "2026-02-06T18:30:00.000Z"
  },
];

export default function TrendingCarousel() {
  return (
    <div>
     <Carousel plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]} opts={{
        align: "start",
      }}
      className="">
  <CarouselContent className="gap-2">
    {mockTrending.map((item) => (
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
    </div>
  );
}
