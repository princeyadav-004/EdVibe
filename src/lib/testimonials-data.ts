import data from './testimonials-data.json';

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  review: string;
};

export const testimonialsData: Testimonial[] = data.testimonials;

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonialsData.find(t => t.id === id);
}
