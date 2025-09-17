import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Testimonials } from "@/components/landing/testimonials";

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
