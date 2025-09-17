
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import initialData from './testimonials-data.json';

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  review: string;
};

// Function to get all testimonials from Firestore, sorted by creation date
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const reviewsCollection = collection(db, 'reviews');
    const q = query(reviewsCollection, orderBy('createdAt', 'desc'));
    const reviewSnapshot = await getDocs(q);
    const reviewsList = reviewSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Testimonial, 'id'>),
    }));
     // Combine initial static data with Firestore data, ensuring no duplicates
    const combined = [...reviewsList, ...initialData.testimonials];
    const uniqueTestimonials = Array.from(new Set(combined.map(a => a.id)))
      .map(id => combined.find(a => a.id === id)!);
      
    return uniqueTestimonials;
  } catch (error) {
    console.error("Error fetching testimonials from Firestore:", error);
    // Fallback to static data if Firestore fails
    return initialData.testimonials;
  }
}

// Function to get a single testimonial by ID
export async function getTestimonialById(id: string): Promise<Testimonial | undefined> {
   try {
    const docRef = doc(db, 'reviews', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Testimonial;
    } else {
      // Fallback to searching in the static data if not found in Firestore
      return initialData.testimonials.find(t => t.id === id);
    }
  } catch (error) {
    console.error("Error fetching testimonial by ID:", error);
     // Fallback for any error
    return initialData.testimonials.find(t => t.id === id);
  }
}
