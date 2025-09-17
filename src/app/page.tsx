import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Courses } from "@/components/landing/courses";
import { Faculty } from "@/components/landing/faculty";
import { Testimonials } from "@/components/landing/testimonials";
import { ContactCta } from "@/components/landing/contact-cta";
import { Footer } from "@/components/landing/footer";
import { CourseRecommender } from "@/components/landing/course-recommender";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Courses />
        <CourseRecommender />
        <Faculty />
        <Testimonials />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
