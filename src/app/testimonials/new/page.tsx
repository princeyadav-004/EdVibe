import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { redirect } from 'next/navigation';

// This is a placeholder for a server action.
// In a real app, this would save the data to a database.
async function addReview(formData: FormData) {
  "use server";
  const rawFormData = {
    name: formData.get('name'),
    course: formData.get('course'),
    review: formData.get('review'),
  };
  console.log("New review submitted:", rawFormData);
  // Here you would typically save to a database.
  // For now, we'll just log it to the server console.
  
  // After saving, redirect the user to the testimonials page.
  redirect('/testimonials');
}

export default function NewTestimonialPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <div className="container flex justify-center">
          <Card className="w-full max-w-2xl shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-secondary/10 p-3 border-2 border-secondary/20">
                    <Star className="h-7 w-7 text-secondary" />
                  </div>
              </div>
              <CardTitle className="font-headline text-3xl">Share Your Success Story</CardTitle>
              <CardDescription className="text-lg">
                Your feedback helps us and inspires future students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addReview} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">Your Full Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Rohan Mehra" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-base">Course You Took</Label>
                  <Input id="course" name="course" placeholder="e.g., Web Development" required className="bg-background"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review" className="text-base">Your Review</Label>
                  <Textarea
                    id="review"
                    name="review"
                    placeholder="Tell us about your experience. How did this course help you achieve your goals?"
                    required
                    rows={6}
                    className="bg-background"
                  />
                </div>
                <div className="text-center pt-2">
                  <Button type="submit" size="lg">
                    Submit Your Review
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
