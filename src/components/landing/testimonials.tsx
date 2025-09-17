
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { testimonialsData as initialTestimonials, type Testimonial } from '@/lib/testimonials-data';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';
import { Badge } from '../ui/badge';

type TestimonialsProps = {
  newReview?: Testimonial | null;
};

const TRUNCATE_WORD_COUNT = 20;

function TestimonialReview({ review, id }: { review: string, id: string }) {
  const words = review.split(' ');
  const isTruncated = words.length > TRUNCATE_WORD_COUNT;
  const truncatedText = isTruncated ? words.slice(0, TRUNCATE_WORD_COUNT).join(' ') + '...' : review;

  return (
    <>
      <p className="italic text-muted-foreground flex-grow">"{truncatedText}"</p>
      {isTruncated && (
        <Link href={`/testimonials/${id}`} className="text-sm text-primary hover:underline mt-2">
          Read More
        </Link>
      )}
    </>
  );
}


export function Testimonials({ newReview }: TestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const testimonialsData = useMemo(() => {
    if (newReview) {
      if (initialTestimonials.some(t => t.id === newReview.id)) {
        return initialTestimonials;
      }
      return [newReview, ...initialTestimonials];
    }
    return initialTestimonials;
  }, [newReview]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
    
    if (newReview) {
      api.scrollTo(0, false);
      setCurrent(0);
    }

  }, [api, newReview]);

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-br from-primary via-purple-700 to-accent py-20 sm:py-28"
    >
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter text-primary-foreground sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Real stories from {testimonialsData.length} students who achieved their dreams with EdVibe.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="mx-auto w-full max-w-xs sm:max-w-2xl lg:max-w-6xl"
        >
          <CarouselContent className="-ml-4">
            {testimonialsData.map((testimonial, index) => {
              const testimonialImage = PlaceHolderImages.find(img => img.id === testimonial.id);
              const isNew = newReview && testimonial.id === newReview.id;
              return (
                <CarouselItem
                  key={testimonial.id}
                  className={cn(
                    'pl-4 transition-transform duration-300 ease-in-out md:basis-1/2 lg:basis-1/3',
                    index === current ? 'scale-100' : 'scale-90 opacity-60'
                  )}
                >
                  <Card className="h-full flex flex-col justify-between shadow-lg relative overflow-hidden">
                     {isNew && (
                        <Badge className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground">
                          Just Added!
                        </Badge>
                      )}
                    <CardContent className="flex flex-col items-center p-8 text-center">
                     
                      {testimonialImage ? (
                        <Image
                          src={testimonialImage.imageUrl}
                          alt={`Photo of ${testimonial.name}`}
                          width={80}
                          height={80}
                          className="mb-6 h-20 w-20 rounded-full object-cover border-4 border-white/50"
                          data-ai-hint={testimonialImage.imageHint}
                        />
                      ) : (
                         <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted object-cover border-4 border-white/50">
                           <span className="text-2xl font-bold text-muted-foreground">
                             {testimonial.name.charAt(0)}
                           </span>
                         </div>
                      )}
                      <TestimonialReview review={testimonial.review} id={testimonial.id} />
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
          <CarouselPrevious className="hidden sm:flex -left-12 bg-white/30 text-white border-white/50 hover:bg-white/50" />
          <CarouselNext className="hidden sm:flex -right-12 bg-white/30 text-white border-white/50 hover:bg-white/50" />
        </Carousel>
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white bg-transparent text-white transition-transform hover:scale-105 hover:bg-white hover:text-primary"
          >
            <Link href="/testimonials/new">
              <Star className="mr-2 h-4 w-4" />
              Add Your Review
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
