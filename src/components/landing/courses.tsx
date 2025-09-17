
import { Code, Palette, AreaChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const coursesData = [
  {
    icon: Code,
    title: "Web Development",
    description: "Master front-end and back-end technologies to build modern web applications from scratch.",
    successRate: 95,
    gradient: "from-primary to-accent",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Learn the principles of user-centric design to create beautiful and intuitive digital experiences.",
    successRate: 92,
    gradient: "from-sky-400 to-cyan-300",
  },
  {
    icon: AreaChart,
    title: "Data Science",
    description: "Dive into data analysis, machine learning, and visualization to extract meaningful insights.",
    successRate: 88,
    gradient: "from-secondary to-orange-400",
  },
];

export function Courses() {
  return (
    <section id="courses" className="bg-muted/30">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Find Your Path to Success
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our courses are designed to provide you with the practical skills and knowledge needed to excel in today's competitive job market.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coursesData.map((course, index) => (
            <div
              key={index}
              className={`rounded-xl bg-gradient-to-br p-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${course.gradient}`}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-muted p-4">
                      <course.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center font-headline text-2xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1">
                  <CardDescription>{course.description}</CardDescription>
                  <div className="mt-6">
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      Success Rate
                    </p>
                    <Progress value={course.successRate} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
