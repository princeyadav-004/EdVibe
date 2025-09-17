
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section id="contact" className="bg-gradient-to-r from-primary to-accent">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter text-primary-foreground sm:text-4xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Let's talk about your future. Our expert counselors are here to guide you towards the perfect course and career path, absolutely free.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="mt-8 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-transform hover:scale-105"
            asChild
          >
            <Link href="#">Book a Free Counselling Session</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
