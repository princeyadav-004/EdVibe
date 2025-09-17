import data from './testimonials-data.json';

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  review: string;
};

export const testimonialsData: Testimonial[] = data.testimonials;
