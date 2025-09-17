
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
  {
    id: "testimonial-4",
    name: "Priya Patel",
    course: "Digital Marketing",
    review: "The practical skills I learned were immediately applicable to my job. Highly recommended!",
  },
  {
    id: "testimonial-5",
    name: "Amit Kumar",
    course: "Machine Learning",
    review: "Deep, challenging, and incredibly rewarding. The instructors are experts in their field.",
  },
  {
    id: "testimonial-6",
    name: "Sneha Reddy",
    course: "Cloud Computing",
    review: "This course opened up so many doors for me. I'm now a certified cloud practitioner!",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-gradient-to-br from-primary via-purple-700 to-accent py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
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
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="mx-auto w-full max-w-xs sm:max-w-2xl lg:max-w-6xl"
        >
          <CarouselContent className="-ml-4">
            {testimonialsData.map((testimonial, index) => {
               const testimonialImage = PlaceHolderImages.find((img) => img.id === testimonial.id);
              return (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full flex flex-col justify-between">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    {testimonialImage && (
                      <Image
                        src={testimonialImage.imageUrl}
                        alt={`Photo of ${testimonial.name}`}
                        width={80}
                        height={80}
                        className="mb-6 h-20 w-20 rounded-full object-cover border-4 border-white/50"
                        data-ai-hint={testimonialImage.imageHint}
                      />
                    )}
                    <p className="italic text-muted-foreground flex-grow">"{testimonial.review}"</p>
                    <div className="mt-6">
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.course}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-12" />
          <CarouselNext className="hidden sm:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
}
