
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-students");

  return (
    <section className="relative h-[calc(100vh-3.5rem)] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div className="container max-w-screen-md text-white">
          <h1 className="text-4xl font-black font-headline leading-tight tracking-tighter sm:text-5xl md:text-6xl">
            Dream • Prepare • Achieve
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-lg text-gray-200 md:text-xl">
            Unlock your potential with our expert-led courses. EdVibe is your partner in building a successful future.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-transform hover:scale-105"
              asChild
            >
              <Link href="#contact">Join Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/50 text-white hover:bg-white/10 transition-transform hover:scale-105"
              asChild
            >
              <Link href="#courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
