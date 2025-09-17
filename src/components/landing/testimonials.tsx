
"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";

const testimonialsData = [
  {
    id: "testimonial-1",
    name: "Rohan Mehra",
    course: "Web Development",
    review: "The hands-on projects were incredible. I landed a job even before I finished the course!",
  },
  {
    id: "testimonial-2",
    name: "Anjali Desai",
    course: "UI/UX Design",
    review: "EdVibe completely changed my career path. The instructors are so supportive and knowledgeable.",
  },
  {
    id: "testimonial-3",
    name: "Vikram Chauhan",
    course: "Data Science",
    review: "A truly transformative experience. The curriculum is top-notch and industry-relevant.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-gradient-to-br from-primary via-purple-700 to-accent py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter text-primary-foreground sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Real stories from students who achieved their dreams with EdVibe.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="mx-auto w-full max-w-xs sm:max-w-xl lg:max-w-4xl"
        >
          <CarouselContent>
            {testimonialsData.map((testimonial, index) => {
               const testimonialImage = PlaceHolderImages.find((img) => img.id === testimonial.id);
              return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      {testimonialImage && (
                        <Image
                          src={testimonialImage.imageUrl}
                          alt={`Photo of ${testimonial.name}`}
                          width={80}
                          height={80}
                          className="mb-4 h-20 w-20 rounded-full object-cover"
                          data-ai-hint={testimonialImage.imageHint}
                        />
                      )}
                      <p className="italic text-muted-foreground">"{testimonial.review}"</p>
                      <div className="mt-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-primary">{testimonial.course}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
