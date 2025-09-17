'use server';
/**
 * @fileOverview An AI agent that generates a career path based on user interests and goals.
 * 
 * - generateCareerPath - A function that creates a career path.
 * - GenerateCareerPathInput - The input type for the generateCareerPath function.
 * - GenerateCareerPathOutput - The return type for the generateCareerPath function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCareerPathInputSchema = z.object({
  interests: z.string().describe('The user\'s interests, hobbies, and passions.'),
  goals: z.string().describe('The user\'s long-term career goals or dream job.'),
  courses: z.string().describe('A comma-separated list of available courses to recommend.'),
});

export type GenerateCareerPathInput = z.infer<typeof GenerateCareerPathInputSchema>;

const CareerStepSchema = z.object({
  title: z.string().describe('The job title or role for this career step (e.g., "Junior Web Developer", "UI/UX Design Intern").'),
  duration: z.string().describe('An estimated duration for this career step (e.g., "0-1 Years", "1-2 Years").'),
  description: z.string().describe('A brief, 1-2 sentence description of what this role entails and its importance in the career path.'),
  skillsToLearn: z.array(z.string()).describe('A list of 3-5 key skills or technologies to master during this step.'),
  recommendedCourse: z.string().optional().describe('The name of a single, most relevant course from the available courses list for this step.'),
});

const GenerateCareerPathOutputSchema = z.object({
  title: z.string().describe('A catchy, inspiring title for the generated career path (e.g., "From Aspiring Artist to Digital Design Leader").'),
  summary: z.string().describe('A short, encouraging paragraph summarizing the entire career journey for the user.'),
  path: z.array(CareerStepSchema).describe('An array of 2-4 career steps, starting from an entry-level position.'),
});

export type GenerateCareerPathOutput = z.infer<typeof GenerateCareerPathOutputSchema>;

export async function generateCareerPath(input: GenerateCareerPathInput): Promise<GenerateCareerPathOutput> {
  return careerPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerPathPrompt',
  input: { schema: GenerateCareerPathInputSchema },
  output: { schema: GenerateCareerPathOutputSchema },
  prompt: `You are an expert career counselor and AI assistant for an online education platform called EdVibe. Your goal is to create a realistic and inspiring career path for users based on their stated interests and goals.

The user's input:
- Interests: {{{interests}}}
- Goals: {{{goals}}}

Here is a list of courses you can recommend. Only recommend courses from this list:
- Available Courses: {{{courses}}}

Based on the user's input, generate a clear, step-by-step career path. The path should consist of 2 to 4 distinct steps, starting from an entry-level or foundational role and progressing logically.

For each step in the path, provide:
1.  A clear job title and an estimated duration.
2.  A brief description of the role's purpose.
3.  A list of 3-5 essential skills to focus on learning during that stage.
4.  If applicable, recommend ONE course from the available list that is most relevant to that specific step. Do not recommend a course if none are a good fit for a particular step.

Finally, wrap the entire plan with an overall title for the career path and a brief, encouraging summary of the journey ahead. Make the tone optimistic and empowering.`,
});

const careerPathFlow = ai.defineFlow(
  {
    name: 'careerPathFlow',
    inputSchema: GenerateCareerPathInputSchema,
    outputSchema: GenerateCareerPathOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
