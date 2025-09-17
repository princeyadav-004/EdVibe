
export type Faculty = {
  id: string;
  name: string;
  title: string;
  badges: string[];
};

export const facultyData: Faculty[] = [
  {
    id: "faculty-1",
    name: "Dr. Alisha Verma",
    title: "Head of Web Development",
    badges: ["15+ Years Experience", "PhD in CS", "Google Certified"],
  },
  {
    id: "faculty-2",
    name: "Rahul Singh",
    title: "Lead UI/UX Instructor",
    badges: ["10+ Years Experience", "Adobe Certified Expert", "Design Award '22"],
  },
  {
    id: "faculty-3",
    name: "Priya Sharma",
    title: "Data Science Expert",
    badges: ["12+ Years Experience", "Microsoft AI MVP", "Big Data Specialist"],
  },
];
