
'use client';

import { useActionState } from 'react';
import { addReview, ReviewState } from '@/app/actions';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Star, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function NewTestimonialPage() {
  const initialState: ReviewState = { message: null, errors: {} };
  const [state, dispatch, pending] = useActionState(addReview, initialState);
  
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
              <CardDescription className="text-lg text-muted-foreground">
                Your feedback helps us and inspires future students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={dispatch} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">Your Full Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Rohan Mehra" required className="bg-background" />
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.name &&
                      state.errors.name.map((error: string) => (
                        <p className="mt-1 text-sm text-destructive" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">Your Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="e.g., rohan@example.com" required className="bg-background" />
                  <div id="email-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.email &&
                      state.errors.email.map((error: string) => (
                        <p className="mt-1 text-sm text-destructive" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-base font-medium">Course You Took</Label>
                  <Input id="course" name="course" placeholder="e.g., Web Development" required className="bg-background"/>
                   <div id="course-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.course &&
                      state.errors.course.map((error: string) => (
                        <p className="mt-1 text-sm text-destructive" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review" className="text-base font-medium">Your Review</Label>
                  <Textarea
                    id="review"
                    name="review"
                    placeholder="Tell us about your experience. How did this course help you achieve your goals?"
                    required
                    rows={6}
                    className="bg-background"
                  />
                   <div id="review-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.review &&
                      state.errors.review.map((error: string) => (
                        <p className="mt-1 text-sm text-destructive" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="text-center pt-2">
                  <Button type="submit" size="lg" disabled={pending} className={cn("transition-all", pending && "cursor-not-allowed")}>
                    {pending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : 'Submit Your Review'}
                  </Button>
                </div>
                 {state.message && !state.errors && (
                  <p className="mt-4 text-sm text-green-600 text-center">{state.message}</p>
                )}
                 {state.message && state.errors && (
                  <p className="mt-4 text-sm text-destructive text-center">{state.message}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
