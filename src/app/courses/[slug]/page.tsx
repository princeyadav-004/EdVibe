
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { getCourseBySlug, getInstructorForCourse } from '@/lib/courses-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Book, Users, BarChart, ArrowRight } from 'lucide-react';

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const instructor = getInstructorForCourse(course);
  const instructorImage = instructor ? PlaceHolderImages.find(img => img.id === instructor.id) : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`relative py-20 text-white bg-gradient-to-r ${course.gradient}`}>
           <div className="absolute inset-0 bg-black/20"></div>
           <div className="container relative z-10">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">{course.title}</Badge>
              <h1 className="text-4xl font-black font-headline leading-tight tracking-tighter sm:text-5xl md:text-6xl">
                {course.title}
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80">
                {course.longDescription}
              </p>
              <div className="mt-8 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Taught by <span className="font-bold">{instructor?.name}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>{course.successRate}% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container py-16 grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
                {/* Syllabus Section */}
                <section id="syllabus" className="mb-12">
                    <h2 className="text-3xl font-bold font-headline mb-6">Course Syllabus</h2>
                     <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                        {course.syllabus.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Book className="h-5 w-5" />
                                    </div>
                                    <span>{item.module}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-14">
                                <p className="text-muted-foreground mb-4">{item.description}</p>
                                <ul className="space-y-2">
                                    {item.topics.map(topic => (
                                        <li key={topic} className="flex items-center gap-3">
                                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                            <span>{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                 {/* Projects Section */}
                <section id="projects" className="mb-12">
                    <h2 className="text-3xl font-bold font-headline mb-6">Student Projects</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {course.projects.map(project => {
                           const projectImage = PlaceHolderImages.find(img => img.id === project.imageId);
                           return (
                                <Card key={project.title} className="overflow-hidden group">
                                     {projectImage && (
                                        <div className="overflow-hidden">
                                        <Image 
                                            src={projectImage.imageUrl} 
                                            alt={project.description} 
                                            width={600} 
                                            height={400} 
                                            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                                            data-ai-hint={projectImage.imageHint}
                                        />
                                        </div>
                                     )}
                                    <CardHeader>
                                        <CardTitle>{project.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{project.description}</p>
                                    </CardContent>
                                </Card>
                           );
                        })}
                    </div>
                </section>
            </div>
            
            {/* Sidebar Section */}
            <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Start Your Journey</CardTitle>
                        <CardDescription>Enroll today and unlock your potential.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {instructor && (
                            <div>
                                <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-3">Instructor</h3>
                                <div className="flex items-center gap-4">
                                     {instructorImage && (
                                        <Image src={instructorImage.imageUrl} alt={instructor.name} width={64} height={64} className="rounded-full h-16 w-16 object-cover" data-ai-hint={instructorImage.imageHint}/>
                                     )}
                                    <div>
                                        <p className="font-bold">{instructor.name}</p>
                                        <p className="text-sm text-primary">{instructor.title}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                         <Button size="lg" className="w-full" asChild>
                            <Link href="/#contact">
                                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                         </Button>
                         <Button size="lg" variant="outline" className="w-full" asChild>
                            <Link href="/#contact">Book Free Counseling</Link>
                         </Button>
                    </CardContent>
                </Card>
            </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
