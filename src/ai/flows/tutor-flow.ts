'use server';
/**
 * @fileOverview An AI agent that acts as an interactive tutor.
 * 
 * - getTutorResponse - A function that provides an answer to a student's question.
 * - TutorInputSchema - The input type for the getTutorResponse function.
 * - TutorOutputSchema - The return type for the getTutorResponse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Message, Part } from 'genkit';

const TutorInputSchema = z.object({
  history: z.array(Message).describe("The conversation history."),
  question: z.string().describe("The user's latest question."),
});

export type TutorInput = z.infer<typeof TutorInputSchema>;

const TutorOutputSchema = z.string();

export type TutorOutput = z.infer<typeof TutorOutputSchema>;

export async function getTutorResponse(input: TutorInput): Promise<TutorOutput> {
  return tutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tutorPrompt',
  input: { schema: TutorInputSchema },
  output: { format: 'text' },
  prompt: `You are Ed, an expert AI Tutor for the online education platform EdVibe. Your role is to provide clear, concise, and friendly explanations to students' questions about various technical topics, primarily in web development, UI/UX design, data science, and digital marketing.

- Keep your tone encouraging and supportive.
- Use simple language and analogies to explain complex concepts.
- If a user asks a question outside your expertise, politely state that it's beyond the topics you cover.
- Keep answers relatively short and focused. You are a chatbot, not a textbook.
- You can format your responses with markdown for clarity (e.g., using code blocks for examples, lists, etc.).

Conversation History:
{{#each history}}
- {{role}}: {{#each parts}}{{{text}}}{{/each}}
{{/each}}

New Question: {{{question}}}

Your Answer:`,
});

const tutorFlow = ai.defineFlow(
  {
    name: 'tutorFlow',
    inputSchema: TutorInputSchema,
    outputSchema: TutorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
