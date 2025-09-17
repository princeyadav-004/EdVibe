import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Courses } from "@/components/landing/courses";
import { Faculty } from "@/components/landing/faculty";
import { ContactCta } from "@/components/landing/contact-cta";
import { Footer } from "@/components/landing/footer";
import { CareerPath } from "@/components/landing/career-path";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Courses />
        <CareerPath />
        <Faculty />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
