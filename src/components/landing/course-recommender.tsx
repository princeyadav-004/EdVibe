
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { getCourseRecommendations, State } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2, PartyPopper, AlertCircle, Sparkles, Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "../ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Finding Courses...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Recommendations
        </>
      )}
    </Button>
  );
}

function RecommenderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
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
    if (state.message && !state.recommendations?.length) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.message,
      });
    }
    if (state.recommendations?.length) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <section id="recommender" className="bg-muted/30">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-24">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Don't Know Where to Start?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Let our AI guide you! Just tell us a bit about your interests and academic background, and we'll suggest the perfect courses to kickstart your journey.
          </p>
          <form ref={formRef} action={dispatch} className="mt-8 space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="prompt" className="text-base font-semibold">Describe yourself & your goals</Label>
              <Textarea
                id="prompt"
                name="prompt"
                placeholder="Tell us about your interests, what you've studied, and what you'd like to learn. For example: 'I'm a recent high school graduate who loves art and technology. I'm interested in a creative career and have some basic experience with Photoshop.'"
                aria-describedby="prompt-error"
                rows={6}
                className="bg-background"
              />
              <div id="prompt-error" aria-live="polite" aria-atomic="true">
                {state.errors?.prompt &&
                  state.errors.prompt.map((error: string) => (
                    <p className="mt-1 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <SubmitButton />
          </form>
        </div>

        {/* Right Side: Results */}
        <div className="flex min-h-[450px] items-center justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <div className="rounded-full bg-primary/10 p-3 border-2 border-primary/20">
                  <PartyPopper className="h-7 w-7 text-primary" />
                </div>
              </div>
              <CardTitle className="font-headline text-2xl">
                Your AI Recommendations
              </CardTitle>
              <CardDescription>
                Suggestions based on your profile will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[250px] flex flex-col justify-center">
              {pending ? (
                 <RecommenderSkeleton />
              ) : state.recommendations && state.recommendations.length > 0 ? (
                <ul className="space-y-4">
                  {state.recommendations.map((rec) => (
                    <li key={rec}>
                      <Card className="bg-background/50 hover:bg-background transition-colors hover:shadow-md">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="bg-secondary/10 p-2 rounded-lg">
                            <Sparkles className="h-6 w-6 text-secondary" />
                          </div>
                          <div>
                            <p className="font-semibold text-card-foreground">{rec}</p>
                            <p className="text-sm text-muted-foreground">Recommended for you</p>
                          </div>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              ) : state.message && !state.recommendations ? (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-8 text-center text-destructive">
                  <AlertCircle className="h-10 w-10 mb-4" />
                  <p className="font-medium">{state.message}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground">
                  <Lightbulb className="h-10 w-10 mb-4 text-primary" />
                  <p className="font-medium">Your personalized course suggestions are just a click away!</p>
                  <p className="text-sm">Fill out the form to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
