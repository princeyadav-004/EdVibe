
"use server";

import { recommendCourses, RecommendCoursesOutput } from "@/ai/flows/course-recommendation";
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

const CourseRecommendationSchema = z.object({
  prompt: z.string().min(20, { message: "Please provide more details about your interests and background (at least 20 characters)." }),
});

export type State = {
  errors?: {
    prompt?: string[];
  };
  message?: string | null;
  recommendations?: RecommendCoursesOutput['recommendedCourses'] | null;
};

export async function getCourseRecommendations(
  prevState: State,
  formData: FormData
): Promise<State> {
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
    // We pass the user's prompt as both interests and academic history for a more holistic recommendation.
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
