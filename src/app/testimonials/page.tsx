
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Testimonials } from '@/components/landing/testimonials';
import { ContactCta } from '@/components/landing/contact-cta';
import { cookies } from 'next/headers';
import type { Testimonial } from '@/lib/testimonials-data';

export default function TestimonialsPage() {
  const cookieStore = cookies();
  const newReviewCookie = cookieStore.get('new_review');
  
  let newReview: Testimonial | null = null;
  if (newReviewCookie?.value) {
    try {
      newReview = JSON.parse(newReviewCookie.value);
    } catch (e) {
      console.error("Failed to parse new_review cookie", e);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Testimonials newReview={newReview} />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
