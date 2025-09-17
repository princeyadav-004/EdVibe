import { Code, Palette, AreaChart } from "lucide-react";
import { Faculty, facultyData } from "./faculty-data";

export type Course = {
  title: string;
  slug: string;
  icon: React.ComponentType<any>;
  description: string;
  longDescription: string;
  successRate: number;
  gradient: string;
  instructorId: string;
  syllabus: {
    module: string;
    description: string;
    topics: string[];
  }[];
  projects: {
    title: string;
    description: string;
    imageId: string;
  }[];
};

export const coursesData: Course[] = [
  {
    title: "Web Development",
    slug: "web-development",
    icon: Code,
    description: "Master front-end and back-end technologies to build modern web applications from scratch.",
    longDescription: "Our comprehensive Web Development course covers everything from the basics of HTML, CSS, and JavaScript to advanced frameworks like React and Node.js. You'll learn how to build responsive, full-stack applications and deploy them to the cloud. This course is perfect for beginners looking to start a new career or experienced developers wanting to level up their skills.",
    successRate: 95,
    gradient: "from-primary to-accent",
    instructorId: "faculty-1",
    syllabus: [
      {
        module: "Module 1: Foundations",
        description: "Understanding the building blocks of the web.",
        topics: ["HTML5 Semantics", "CSS3, Flexbox & Grid", "Responsive Design", "JavaScript Fundamentals (ES6+)"],
      },
      {
        module: "Module 2: Front-End Frameworks",
        description: "Building interactive user interfaces with React.",
        topics: ["React & JSX", "State & Props", "Component Lifecycle", "React Hooks", "React Router"],
      },
      {
        module: "Module 3: Back-End Development",
        description: "Creating servers and APIs with Node.js.",
        topics: ["Node.js & Express", "RESTful API Design", "Database Integration (PostgreSQL)", "Authentication & Security"],
      },
      {
        module: "Module 4: Full-Stack & Deployment",
        description: "Bringing it all together and going live.",
        topics: ["Connecting React to Express", "State Management with Redux/Zustand", "Deployment to Vercel/Netlify", "Final Capstone Project"],
      },
    ],
    projects: [
      {
        title: "E-Commerce Store",
        description: "Build a fully functional online store with a product catalog, shopping cart, and checkout process.",
        imageId: "project-web-1",
      },
      {
        title: "Personal Portfolio",
        description: "Create a dynamic, data-driven personal portfolio to showcase your projects and skills to potential employers.",
        imageId: "project-web-2",
      },
    ],
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    icon: Palette,
    description: "Learn the principles of user-centric design to create beautiful and intuitive digital experiences.",
    longDescription: "This course immerses you in the world of User Interface (UI) and User Experience (UX) design. You'll learn the entire design process, from user research and wireframing to prototyping and usability testing. Using industry-standard tools like Figma, you will build a portfolio of compelling design projects.",
    successRate: 92,
    gradient: "from-sky-400 to-cyan-300",
    instructorId: "faculty-2",
     syllabus: [
      {
        module: "Module 1: UX Fundamentals",
        description: "Understanding the user and their needs.",
        topics: ["User Research & Personas", "Journey Mapping", "Information Architecture", "Usability Principles"],
      },
      {
        module: "Module 2: UI Design Principles",
        description: "Crafting visually appealing interfaces.",
        topics: ["Color Theory & Typography", "Layout & Composition", "Design Systems & Style Guides", "Iconography"],
      },
      {
        module: "Module 3: Prototyping in Figma",
        description: "Bringing designs to life with interactive prototypes.",
        topics: ["Figma Essentials", "Component-Based Design", "Interactive Prototyping", "Collaboration Workflows"],
      },
      {
        module: "Module 4: Testing & Portfolio",
        description: "Validating designs and showcasing your work.",
        topics: ["Usability Testing", "Feedback Iteration", "Building a UX Case Study", "Portfolio Presentation"],
      },
    ],
    projects: [
       {
        title: "Mobile Banking App",
        description: "Design a clean and secure mobile banking application from concept to high-fidelity prototype.",
        imageId: "project-ui-1",
      },
      {
        title: "Project Management Dashboard",
        description: "Create a user-friendly dashboard for a team to track tasks, progress, and deadlines.",
        imageId: "project-ui-2",
      },
    ],
  },
  {
    title: "Data Science",
    slug: "data-science",
    icon: AreaChart,
    description: "Dive into data analysis, machine learning, and visualization to extract meaningful insights.",
    longDescription: "The Data Science course provides a rigorous introduction to the tools and techniques used by data scientists. You'll master Python for data analysis using libraries like Pandas and NumPy, learn statistical modeling, and build predictive machine learning models with Scikit-learn. The course culminates in a project where you'll analyze a real-world dataset.",
    successRate: 88,
    gradient: "from-secondary to-orange-400",
    instructorId: "faculty-3",
     syllabus: [
      {
        module: "Module 1: Python for Data Science",
        description: "Mastering data manipulation and analysis.",
        topics: ["NumPy for numerical data", "Pandas for dataframes", "Data Cleaning & Preprocessing", "Data Visualization with Matplotlib & Seaborn"],
      },
      {
        module: "Module 2: Statistical Foundations",
        description: "Understanding the core concepts behind the data.",
        topics: ["Probability & Statistics", "Hypothesis Testing", "Linear & Logistic Regression", "Model Evaluation"],
      },
      {
        module: "Module 3: Machine Learning",
        description: "Building predictive models.",
        topics: ["Supervised vs. Unsupervised Learning", "Decision Trees & Random Forests", "Clustering with K-Means", "Introduction to Neural Networks"],
      },
      {
        module: "Module 4: Real-World Applications",
        description: "Applying your skills to practical problems.",
        topics: ["Time Series Analysis", "Natural Language Processing (NLP) Basics", "Working with Big Data", "Final Capstone Project"],
      },
    ],
    projects: [
       {
        title: "Sales Trend Prediction",
        description: "Analyze historical sales data to build a model that predicts future sales trends.",
        imageId: "project-data-1",
      },
      {
        title: "Customer Segmentation",
        description: "Use clustering algorithms to segment a customer base for targeted marketing campaigns.",
        imageId: "project-data-2",
      },
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return coursesData.find((course) => course.slug === slug);
}

export function getInstructorForCourse(course: Course): Faculty | undefined {
  return facultyData.find((faculty) => faculty.id === course.instructorId);
}
