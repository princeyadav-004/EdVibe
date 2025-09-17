
"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { getCourseRecommendations, State } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2, PartyPopper, AlertCircle } from "lucide-react";

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

export function CourseRecommender() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(getCourseRecommendations, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.recommendations) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <section id="recommender" className="bg-muted/30">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl">
            Don't Know Where to Start?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Let our AI guide you! Just tell us a bit about your interests and academic background, and we'll suggest the perfect courses to kickstart your journey.
          </p>
          <form action={dispatch} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="interests">Your Interests</Label>
              <Input
                id="interests"
                name="interests"
                placeholder="e.g., coding, creative design, business strategy"
                aria-describedby="interests-error"
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
              <Label htmlFor="academicHistory">Your Academic History</Label>
              <Textarea
                id="academicHistory"
                name="academicHistory"
                placeholder="e.g., Completed B.Sc in Physics, basic knowledge of Python"
                aria-describedby="academicHistory-error"
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
          <Card className="w-full max-w-md bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-xl flex items-center justify-center gap-2">
                <PartyPopper className="h-6 w-6 text-primary" />
                Your Course Recommendations
              </CardTitle>
              <CardDescription>
                Results from our AI will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.recommendations && state.recommendations.length > 0 ? (
                <ul className="space-y-2">
                  {state.recommendations.map((rec) => (
                    <li key={rec} className="rounded-md bg-background p-3 text-center font-medium shadow-sm">
                      {rec}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground">
                  <Lightbulb className="h-10 w-10 mb-4" />
                  <p>Your personalized course suggestions are just a click away!</p>
                </div>
              )}
               {state.message && !state.recommendations && (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-8 text-center text-destructive">
                  <AlertCircle className="h-10 w-10 mb-4" />
                  <p>{state.message}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
