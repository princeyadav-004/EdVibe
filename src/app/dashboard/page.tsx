
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { coursesData, Course } from '@/lib/courses-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

function DashboardSkeleton() {
    return (
        <div className="container py-12">
            <Skeleton className="h-10 w-1/3 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-10" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-2 w-full" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}


export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-muted/30">
            <DashboardSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  // For demo purposes, we assume the user is enrolled in all courses.
  // In a real app, you would fetch the user's specific enrollments.
  const enrolledCourses = coursesData;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-12">
            <h1 className="text-3xl font-bold font-headline sm:text-4xl">Welcome back, {user.displayName?.split(' ')[0]}!</h1>
            <p className="mt-2 text-lg text-muted-foreground">Ready to continue your learning journey?</p>

            <div className="mt-10">
                <h2 className="text-2xl font-bold font-headline mb-6">My Courses</h2>
                {enrolledCourses.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {enrolledCourses.map((course) => (
                            <Card key={course.slug} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                                    <CardDescription className="text-sm">{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    {/* In a real app, this progress would be dynamic */}
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Progress</p>
                                        <Progress value={Math.floor(Math.random() * 80) + 10} />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={`/courses/${course.slug}`}>Go to Course</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
                        <Button asChild variant="link">
                            <Link href="/#courses">Explore Courses</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
