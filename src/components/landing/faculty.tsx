
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const facultyData = [
  {
    id: "faculty-1",
    name: "Dr. Alisha Verma",
    title: "Head of Web Development",
    badges: ["15+ Years Experience", "PhD in CS", "Google Certified"],
  },
  {
    id: "faculty-2",
    name: "Rahul Singh",
    title: "Lead UI/UX Instructor",
    badges: ["10+ Years Experience", "Adobe Certified Expert", "Design Award '22"],
  },
  {
    id: "faculty-3",
    name: "Priya Sharma",
    title: "Data Science Expert",
    badges: ["12+ Years Experience", "Microsoft AI MVP", "Big Data Specialist"],
  },
];

export function Faculty() {
  return (
    <section id="faculty">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Meet Our Expert Faculty
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn from industry veterans and academic pioneers who are passionate about teaching.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {facultyData.map((member) => {
            const facultyImage = PlaceHolderImages.find((img) => img.id === member.id);
            return (
              <Card
                key={member.name}
                className="overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <CardHeader className="bg-muted/30 pb-4">
                  {facultyImage && (
                    <Image
                      src={facultyImage.imageUrl}
                      alt={`Photo of ${member.name}`}
                      width={128}
                      height={128}
                      className="mx-auto h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                      data-ai-hint={facultyImage.imageHint}
                    />
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-2xl">{member.name}</CardTitle>
                  <CardDescription className="mt-1 text-primary">{member.title}</CardDescription>
                </CardContent>
                <CardFooter className="flex-col gap-2 bg-muted/30 px-6 pb-6 pt-4">
                  <p className="text-sm font-semibold text-muted-foreground">Achievements</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
