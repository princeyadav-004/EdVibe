
"use client";

import { useActionState, useEffect, useRef } from "react";
import { getCareerPath, CareerPathState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2, PartyPopper, AlertCircle, Sparkles, Wand2, Briefcase, Milestone, School, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

function CareerPathSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-full rounded-lg" />
      <Skeleton className="h-4 w-5/6 rounded-lg" />
      <div className="space-y-8 pt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-1/2 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CareerPath() {
  const initialState: CareerPathState = { message: null, errors: {} };
  const [state, dispatch, pending] = useActionState(getCareerPath, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.message && !state.careerPath) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.message,
      });
    }
    if (state.careerPath) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <section id="career-path" className="bg-muted/30">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-24">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl md:text-5xl">
              Map Your Future with AI
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Tell our AI about your passions and your dream job. It will generate a personalized step-by-step career roadmap to help you achieve your goals.
            </p>
          </div>
          <form ref={formRef} action={dispatch} className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="prompt" className="text-base font-semibold">Describe your interests & career goals</Label>
              <Textarea
                id="prompt"
                name="prompt"
                placeholder="For example: 'I love playing video games and I'm a creative person. I want to build immersive game worlds.' or 'I'm passionate about sustainability and want a career that makes a positive impact on the environment.'"
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
            <Button type="submit" disabled={pending} className="w-full sm:w-auto">
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Your Path...
                </>
              ) : (
                <>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Generate Career Path
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Right Side: Results */}
        <div className="flex min-h-[550px] items-center justify-center">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center pb-4">
               <div className="flex justify-center mb-2">
                <div className="rounded-full bg-primary/10 p-3 border-2 border-primary/20">
                  <Milestone className="h-7 w-7 text-primary" />
                </div>
              </div>
              <CardTitle className="font-headline text-2xl">
                Your AI-Powered Career Plan
              </CardTitle>
              <CardDescription>
                Your personalized roadmap will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex flex-col justify-center">
              {pending ? (
                 <CareerPathSkeleton />
              ) : state.careerPath ? (
                <div className="text-left space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-headline text-center">{state.careerPath.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 text-center">{state.careerPath.summary}</p>
                  </div>
                  <div className="relative space-y-8 pl-6 before:absolute before:inset-y-0 before:w-px before:bg-border before:left-6">
                    {state.careerPath.path.map((step, index) => (
                      <div key={index} className="relative">
                        <div className="absolute top-1 -left-[37px] h-10 w-10 bg-background rounded-full flex items-center justify-center">
                          <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground">
                            <span className="font-bold">{index + 1}</span>
                          </div>
                        </div>
                        <div className="pl-6">
                          <p className="text-sm font-semibold text-secondary">{step.duration}</p>
                          <h4 className="font-semibold text-lg text-card-foreground mt-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                          <div className="mt-4">
                            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Skills to Learn</p>
                            <div className="flex flex-wrap gap-2">
                              {step.skillsToLearn.map(skill => <Badge variant="outline" key={skill}>{skill}</Badge>)}
                            </div>
                          </div>
                          {step.recommendedCourse && (
                            <div className="mt-4">
                               <Card className="bg-background/50 border-primary/20">
                                <CardContent className="p-3 flex items-center gap-3">
                                  <School className="h-5 w-5 text-primary flex-shrink-0" />
                                  <div>
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">Recommended Course</p>
                                    <p className="text-sm font-medium">{step.recommendedCourse}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                     <div className="absolute top-1 -left-[37px] h-10 w-10 bg-background rounded-full flex items-center justify-center">
                        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="pl-6">
                         <h4 className="font-semibold text-lg text-green-600 mt-1">Goal Achieved!</h4>
                         <p className="text-sm text-muted-foreground mt-1">You've reached your destination. Congratulations!</p>
                      </div>
                  </div>
                </div>
              ) : state.message && !state.careerPath ? (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-8 text-center text-destructive">
                  <AlertCircle className="h-10 w-10 mb-4" />
                  <p className="font-medium">{state.message}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground">
                  <Lightbulb className="h-10 w-10 mb-4 text-primary" />
                  <p className="font-medium">Your professional journey starts with a single prompt.</p>
                  <p className="text-sm">Describe your dream career to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
