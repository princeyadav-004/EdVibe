import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Tutor } from "@/components/tutor/tutor";

export default function TutorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Tutor />
      </main>
      <Footer />
    </div>
  );
}
