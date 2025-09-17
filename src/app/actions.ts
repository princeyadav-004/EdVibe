
'use server';

import { recommendCourses, RecommendCoursesOutput } from '@/ai/flows/course-recommendation';
import { generateCareerPath, GenerateCareerPathOutput } from '@/ai/flows/career-path-flow';
import { getTutorResponse, TutorInput } from '@/ai/flows/tutor-flow';
import { z } from 'zod';
import { Message } from 'genkit';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const availableCourses = [
  'Web Development',
  'UI/UX Design',
  'Data Science',
  'Digital Marketing',
  'Machine Learning',
  'Cloud Computing',
  'Cybersecurity',
];

// Schema for the original course recommender
const CourseRecommendationSchema = z.object({
  prompt: z
    .string()
    .min(20, {
      message: 'Please provide more details about your interests and background (at least 20 characters).',
    }),
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
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please check the form and try again.',
    };
  }

  const { prompt } = validatedFields.data;

  try {
    const result = await recommendCourses({
      interests: prompt,
      academicHistory: prompt,
      courses: availableCourses.join(', '),
    });

    if (result.recommendedCourses && result.recommendedCourses.length > 0) {
      return { message: 'Here are your recommended courses!', recommendations: result.recommendedCourses };
    } else {
      return { message: "We couldn't find a specific match right now. Please try refining your prompt." };
    }
  } catch (error) {
    console.error('AI Error:', error);
    return { message: 'An unexpected error occurred while generating recommendations.' };
  }
}

// Schema for the new Career Path Generator
const CareerPathSchema = z.object({
  prompt: z
    .string()
    .min(20, { message: 'Please tell us more about your career goals (at least 20 characters).' }),
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
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please check the form and try again.',
    };
  }

  const { prompt } = validatedFields.data;

  try {
    // We pass the user's prompt as both interests and goals for a comprehensive path.
    const result = await generateCareerPath({
      interests: prompt,
      goals: prompt,
      courses: availableCourses.join(', '),
    });

    if (result && result.path && result.path.length > 0) {
      return { message: 'Here is your personalized career path!', careerPath: result };
    } else {
      return {
        message: "We couldn't generate a career path based on your input. Please try refining your prompt.",
      };
    }
  } catch (error) {
    console.error('AI Error:', error);
    return { message: 'An unexpected error occurred while generating your career path.' };
  }
}

// Schema for the AI Tutor
export type TutorMessage = {
  role: 'user' | 'model';
  text: string;
};

export type TutorState = {
  messages: TutorMessage[];
  error?: string | null;
};

export async function askTutor(prevState: TutorState, formData: FormData): Promise<TutorState> {
  const question = formData.get('question') as string;

  if (!question || question.trim().length === 0) {
    return { ...prevState, error: 'Please enter a question.' };
  }

  const userMessage: TutorMessage = { role: 'user', text: question };
  const newMessages: TutorMessage[] = [...prevState.messages, userMessage];

  try {
    // Convert TutorMessage to Genkit Message format for the flow
    const history: Message[] = newMessages.slice(0, -1).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const tutorInput: TutorInput = {
      history,
      question: question,
    };

    const responseText = await getTutorResponse(tutorInput);

    const modelMessage: TutorMessage = { role: 'model', text: responseText };

    return {
      messages: [...newMessages, modelMessage],
      error: null,
    };
  } catch (error) {
    console.error('AI Tutor Error:', error);
    return {
      ...prevState,
      error: 'Sorry, I encountered an error trying to get an answer. Please try again.',
    };
  }
}


// Schema for adding a new review
const ReviewSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  course: z.string().min(3, 'Course name must be at least 3 characters long.'),
  review: z.string().min(20, 'Review must be at least 20 characters long.'),
});

export type ReviewState = {
  errors?: {
    name?: string[];
    course?: string[];
    review?: string[];
  };
  message?: string | null;
};


export async function addReview(prevState: ReviewState, formData: FormData): Promise<ReviewState> {
  const validatedFields = ReviewSchema.safeParse({
    name: formData.get('name'),
    course: formData.get('course'),
    review: formData.get('review'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please check the form and try again.',
    };
  }

  const newReview = {
    ...validatedFields.data,
    id: `testimonial-new-${Date.now()}`, // Temporary unique ID
  };
  
  console.log('New review submitted (not saved permanently):', newReview);
  
  // Since we don't have a database, we'll store the new review in a cookie
  // to be displayed temporarily on the testimonials page.
  cookies().set('new_review', JSON.stringify(newReview), {
    path: '/',
    maxAge: 300, // Cookie will expire in 5 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  // After saving, redirect the user to the testimonials page.
  redirect('/testimonials');
}
