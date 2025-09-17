
"use server";

import { recommendCourses, RecommendCoursesOutput } from "@/ai/flows/course-recommendation";
import { generateCareerPath, GenerateCareerPathOutput } from "@/ai/flows/career-path-flow";
import { z } from "zod";

const availableCourses = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Digital Marketing",
  "Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
];

// Schema for the original course recommender
const CourseRecommendationSchema = z.object({
  prompt: z.string().min(20, { message: "Please provide more details about your interests and background (at least 20 characters)." }),
});

export type CourseRecState = {
  errors?: {
    prompt?: string[];
  };
  message?: string | null;
  recommendations?: RecommendCoursesOutput['recommendedCourses'] | null;
};

export async function getCourseRecommendations(
  prevState: CourseRecState,
  formData: FormData
): Promise<CourseRecState> {
  const validatedFields = CourseRecommendationSchema.safeParse({
    prompt: formData.get("prompt"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check the form and try again.",
    };
  }
  
  const { prompt } = validatedFields.data;

  try {
    const result = await recommendCourses({
      interests: prompt,
      academicHistory: prompt,
      courses: availableCourses.join(", "),
    });

    if (result.recommendedCourses && result.recommendedCourses.length > 0) {
      return { message: "Here are your recommended courses!", recommendations: result.recommendedCourses };
    } else {
      return { message: "We couldn't find a specific match right now. Please try refining your prompt." };
    }

  } catch (error) {
    console.error("AI Error:", error);
    return { message: "An unexpected error occurred while generating recommendations." };
  }
}


// Schema for the new Career Path Generator
const CareerPathSchema = z.object({
  prompt: z.string().min(20, { message: "Please tell us more about your career goals (at least 20 characters)." }),
});

export type CareerPathState = {
  errors?: {
    prompt?: string[];
  };
  message?: string | null;
  careerPath?: GenerateCareerPathOutput | null;
};

export async function getCareerPath(
  prevState: CareerPathState,
  formData: FormData
): Promise<CareerPathState> {
  const validatedFields = CareerPathSchema.safeParse({
    prompt: formData.get("prompt"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check the form and try again.",
    };
  }
  
  const { prompt } = validatedFields.data;

  try {
    // We pass the user's prompt as both interests and goals for a comprehensive path.
    const result = await generateCareerPath({
      interests: prompt,
      goals: prompt,
      courses: availableCourses.join(", "),
    });

    if (result && result.path && result.path.length > 0) {
      return { message: "Here is your personalized career path!", careerPath: result };
    } else {
      return { message: "We couldn't generate a career path based on your input. Please try refining your prompt." };
    }

  } catch (error) {
    console.error("AI Error:", error);
    return { message: "An unexpected error occurred while generating your career path." };
  }
}
