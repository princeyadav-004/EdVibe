
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
  {
    id: "faculty-4",
    name: "Ravi Shankar",
    title: "Digital Marketing Guru",
    badges: ["10+ Years in Growth", "HubSpot Certified", "Ex-Google"],
  },
  {
    id: "faculty-5",
    name: "Dr. Meena Iyer",
    title: "Machine Learning Lead",
    badges: ["MIT Post-doc", "AI Research Papers", "PyTorch Core Contributor"],
  },
  {
    id: "faculty-6",
    name: "Sanjay Patel",
    title: "Principal Cloud Architect",
    badges: ["AWS Certified Pro", "Azure Solutions Expert", "Kubernetes Admin"],
  },
];
