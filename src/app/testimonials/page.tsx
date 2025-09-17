
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Testimonials } from '@/components/landing/testimonials';
import { ContactCta } from '@/components/landing/contact-cta';
import { getTestimonials, type Testimonial } from '@/lib/testimonials-data';

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Testimonials testimonials={testimonials} />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
