
"use server";

import { recommendCourses } from "@/ai/flows/course-recommendation";
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
  interests: z.string().min(3, { message: "Interests must be at least 3 characters long." }),
  academicHistory: z.string().min(10, { message: "Academic history must be at least 10 characters long." }),
});

export type State = {
  errors?: {
    interests?: string[];
    academicHistory?: string[];
  };
  message?: string | null;
  recommendations?: string[] | null;
};

export async function getCourseRecommendations(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CourseRecommendationSchema.safeParse({
    interests: formData.get("interests"),
    academicHistory: formData.get("academicHistory"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check the fields and try again.",
    };
  }
  
  const { interests, academicHistory } = validatedFields.data;

  try {
    const result = await recommendCourses({
      interests,
      academicHistory,
      courses: availableCourses.join(", "),
    });

    if (result.recommendedCourses) {
      const recommended = result.recommendedCourses.split(',').map(course => course.trim());
      return { message: "Here are your recommended courses!", recommendations: recommended };
    } else {
      return { message: "Could not generate recommendations at this time. Please try again later." };
    }

  } catch (error) {
    console.error("AI Error:", error);
    return { message: "An unexpected error occurred while generating recommendations." };
  }
}
