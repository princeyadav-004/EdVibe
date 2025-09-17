
"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef } from "react";
import { getCourseRecommendations, State } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2, PartyPopper, AlertCircle, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting Recommendations...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" />
          Find My Courses
        </>
      )}
    </Button>
  );
}

function RecommenderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export function CourseRecommender() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(getCourseRecommendations, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.message && !state.recommendations) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.message,
      });
    }
    // Reset form on successful submission
    if (state.recommendations?.length) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <section id="recommender" className="bg-muted/30">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Don't Know Where to Start?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Let our AI guide you! Just tell us a bit about your interests and academic background, and we'll suggest the perfect courses to kickstart your journey.
          </p>
          <form ref={formRef} action={dispatch} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="interests" className="text-base">Your Interests</Label>
              <Input
                id="interests"
                name="interests"
                placeholder="e.g., coding, creative design, business strategy"
                aria-describedby="interests-error"
                className="py-6"
              />
              <div id="interests-error" aria-live="polite" aria-atomic="true">
                {state.errors?.interests &&
                  state.errors.interests.map((error: string) => (
                    <p className="mt-1 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="academicHistory" className="text-base">Your Academic History</Label>
              <Textarea
                id="academicHistory"
                name="academicHistory"
                placeholder="e.g., Completed B.Sc in Physics, basic knowledge of Python"
                aria-describedby="academicHistory-error"
                rows={4}
              />
              <div id="academicHistory-error" aria-live="polite" aria-atomic="true">
                {state.errors?.academicHistory &&
                  state.errors.academicHistory.map((error: string) => (
                    <p className="mt-1 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <SubmitButton />
          </form>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
                <PartyPopper className="h-7 w-7 text-primary" />
                Your AI Recommendations
              </CardTitle>
              <CardDescription>
                Results from our AI will appear below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pending ? (
                 <RecommenderSkeleton />
              ) : state.recommendations && state.recommendations.length > 0 ? (
                <ul className="space-y-3">
                  {state.recommendations.map((rec) => (
                    <li key={rec} className="flex items-center gap-3 rounded-lg border bg-background p-4 font-medium shadow-sm transition-transform hover:scale-105 hover:shadow-md">
                      <Sparkles className="h-5 w-5 text-secondary" />
                      <span className="flex-1">{rec}</span>
                    </li>
                  ))}
                </ul>
              ) : state.message && !state.recommendations ? (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-8 text-center text-destructive">
                  <AlertCircle className="h-10 w-10 mb-4" />
                  <p>{state.message}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground">
                  <Lightbulb className="h-10 w-10 mb-4 text-primary" />
                  <p className="font-medium">Your personalized course suggestions are just a click away!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

    