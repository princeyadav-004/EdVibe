import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, BookOpen, Lightbulb } from "lucide-react";
import { Faculty } from "@/components/landing/faculty";

const values = [
    {
        icon: Users,
        title: "Student-Centric",
        description: "Our students are at the heart of everything we do. We are committed to providing personalized learning experiences and unwavering support to help them succeed.",
    },
    {
        icon: Lightbulb,
        title: "Innovation in Learning",
        description: "We embrace cutting-edge technology and modern teaching methodologies to make learning more effective, engaging, and accessible for everyone.",
    },
    {
        icon: BookOpen,
        title: "Excellence in Education",
        description: "We maintain the highest standards of quality in our curriculum and instruction, ensuring our courses are relevant, practical, and impactful.",
    },
    {
        icon: Target,
        title: "Lifelong Growth",
        description: "We believe education is a continuous journey. We empower our students with the skills and mindset to adapt, grow, and thrive throughout their careers.",
    }
]

export default function AboutPage() {
    const aboutHeroImage = PlaceHolderImages.find((img) => img.id === "about-hero");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 w-full">
            {aboutHeroImage && (
                <Image
                src={aboutHeroImage.imageUrl}
                alt={aboutHeroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={aboutHeroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <div className="container max-w-screen-md text-white">
                <h1 className="text-4xl font-black font-headline leading-tight tracking-tighter sm:text-5xl md:text-6xl">
                    About EdVibe
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-lg text-gray-200 md:text-xl">
                    Our mission is to make high-quality education accessible to everyone, everywhere.
                </p>
                </div>
            </div>
        </section>

        {/* Story Section */}
        <section id="story" className="bg-muted/30">
            <div className="container grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl">Our Story</h2>
                    <p className="text-lg text-muted-foreground">
                        EdVibe was founded in 2023 with a simple yet powerful idea: education should be a force for empowerment, not a barrier. We saw countless individuals with immense potential but limited access to the practical skills needed in the modern tech landscape. Traditional education often lagged behind industry trends, leaving graduates unprepared for real-world challenges.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        We decided to build a new kind of learning platform—one that is flexible, affordable, and deeply connected to the industry. Our focus is on practical, project-based learning taught by experts who are passionate about their craft. Today, EdVibe is a thriving community of learners, instructors, and mentors, all working together to build the future of tech, one student at a time.
                    </p>
                </div>
                 <div className="flex justify-center">
                    <Image src="https://picsum.photos/seed/502/600/500" alt="Founders discussing plans" width={600} height={500} className="rounded-lg shadow-xl" data-ai-hint="team discussion" />
                </div>
            </div>
        </section>

        {/* Values Section */}
         <section id="values">
            <div className="container">
                 <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl md:text-5xl">
                        Our Core Values
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        These principles guide our decisions and define our culture.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {values.map(value => (
                        <Card key={value.title} className="text-center p-4 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                            <CardHeader>
                                 <div className="flex justify-center mb-4">
                                    <div className="rounded-full bg-primary/10 p-4 border-2 border-primary/20">
                                        <value.icon className="h-8 w-8 text-primary" />
                                    </div>
                                </div>
                                <CardTitle className="font-headline text-xl">{value.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
         </section>

        {/* Team Section */}
        <div className="bg-muted/30">
            <Faculty />
        </div>

      </main>
      <Footer />
    </div>
  );
}
