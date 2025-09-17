
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTestimonialById } from '@/lib/testimonials-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TestimonialDetailPage({ params }: { params: { id: string } }) {
  const testimonial = getTestimonialById(params.id);

  if (!testimonial) {
    notFound();
  }

  const testimonialImage = PlaceHolderImages.find(img => img.id === testimonial.id);

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <div className="container flex justify-center">
          <Card className="w-full max-w-3xl shadow-xl">
            <CardHeader className="text-center">
              {testimonialImage ? (
                <Image
                  src={testimonialImage.imageUrl}
                  alt={`Photo of ${testimonial.name}`}
                  width={128}
                  height={128}
                  className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg -mt-24"
                  data-ai-hint={testimonialImage.imageHint}
                />
              ) : (
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-muted object-cover border-4 border-white shadow-lg -mt-24">
                  <span className="text-5xl font-bold text-muted-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              )}
              <CardTitle className="font-headline text-3xl pt-4">{testimonial.name}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Student in <Badge variant="secondary">{testimonial.course}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <blockquote className="text-center text-xl italic leading-relaxed text-foreground border-l-4 border-primary pl-6 mx-auto max-w-xl">
                "{testimonial.review}"
              </blockquote>
              <div className="mt-12 text-center">
                <Button asChild>
                  <Link href="/testimonials">
                    <ArrowLeft className="mr-2" />
                    Back to All Testimonials
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
