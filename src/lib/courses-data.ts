import { Code, Palette, AreaChart, Megaphone, BrainCircuit, Cloud } from "lucide-react";
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
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: Megaphone,
    description: "Learn SEO, SEM, and social media strategies to grow businesses online.",
    longDescription: "This course covers the entire digital marketing landscape. You will master search engine optimization (SEO), pay-per-click (PPC) advertising, social media marketing, content marketing, and email marketing. You'll get hands-on experience with tools like Google Analytics and Facebook Ads Manager.",
    successRate: 91,
    gradient: "from-green-400 to-blue-500",
    instructorId: "faculty-4",
    syllabus: [
      {
        module: "Module 1: Marketing Fundamentals",
        description: "Understanding core marketing principles in the digital age.",
        topics: ["Marketing Funnels", "Target Audience Research", "Branding & Positioning", "Analytics & KPIs"],
      },
      {
        module: "Module 2: Acquiring Traffic",
        description: "Driving users to your website.",
        topics: ["Search Engine Optimization (SEO)", "Pay-Per-Click (PPC) with Google Ads", "Social Media Advertising", "Content Marketing"],
      },
      {
        module: "Module 3: Engagement & Retention",
        description: "Building relationships with your audience.",
        topics: ["Email Marketing Automation", "Community Management", "Conversion Rate Optimization (CRO)", "A/B Testing"],
      },
      {
        module: "Module 4: Strategy & Capstone",
        description: "Developing a comprehensive marketing plan.",
        topics: ["Integrated Digital Strategy", "Budgeting & Planning", "Marketing Campaign Analysis", "Final Capstone Project"],
      },
    ],
    projects: [
      {
        title: "Local Business SEO Audit",
        description: "Perform a complete SEO audit for a local business and provide actionable recommendations.",
        imageId: "project-dm-1",
      },
      {
        title: "Social Media Campaign",
        description: "Plan, execute, and measure a social media campaign for a fictional product launch.",
        imageId: "project-dm-2",
      },
    ],
  },
  {
    title: "Machine Learning",
    slug: "machine-learning",
    icon: BrainCircuit,
    description: "Explore advanced algorithms and build intelligent systems.",
    longDescription: "Go beyond basic data science and dive deep into the world of machine learning. This course covers advanced topics like deep learning, natural language processing (NLP), and computer vision. You'll build and train neural networks using TensorFlow and PyTorch.",
    successRate: 85,
    gradient: "from-purple-500 to-pink-500",
    instructorId: "faculty-5",
    syllabus: [
      {
        module: "Module 1: Advanced Regression & Classification",
        description: "Refining predictive models.",
        topics: ["Support Vector Machines (SVM)", "Ensemble Methods (Gradient Boosting)", "Regularization Techniques", "Model Selection & Hyperparameter Tuning"],
      },
      {
        module: "Module 2: Neural Networks & Deep Learning",
        description: "Understanding the architecture of the modern AI.",
        topics: ["Introduction to Neural Networks", "Building models with TensorFlow/Keras", "Convolutional Neural Networks (CNNs) for Image Data", "Recurrent Neural Networks (RNNs) for Sequence Data"],
      },
      {
        module: "Module 3: Natural Language Processing (NLP)",
        description: "Teaching computers to understand human language.",
        topics: ["Text Preprocessing & Vectorization", "Sentiment Analysis", "Topic Modeling", "Introduction to Transformers (BERT)"],
      },
      {
        module: "Module 4: Deployment & Ethics",
        description: "Bringing ML models into production.",
        topics: ["ML Operations (MLOps)", "Deploying models as APIs", "AI Ethics and Bias", "Final Capstone Project"],
      },
    ],
    projects: [
      {
        title: "Image Classifier",
        description: "Build a deep learning model to classify images into different categories (e.g., cats vs. dogs).",
        imageId: "project-ml-1",
      },
      {
        title: "Movie Review Sentiment Analyzer",
        description: "Use NLP techniques to determine whether a movie review is positive or negative.",
        imageId: "project-ml-2",
      },
    ],
  },
  {
    title: "Cloud Computing",
    slug: "cloud-computing",
    icon: Cloud,
    description: "Master cloud platforms like AWS and Azure to deploy scalable applications.",
    longDescription: "Learn how to design, deploy, and manage applications on leading cloud platforms. This course covers core concepts like virtual machines, containers, serverless computing, and infrastructure as code. You'll get hands-on experience with AWS, and Azure.",
    successRate: 89,
    gradient: "from-blue-500 to-indigo-600",
    instructorId: "faculty-6",
    syllabus: [
      {
        module: "Module 1: Cloud Fundamentals",
        description: "Understanding the core concepts of cloud computing.",
        topics: ["IaaS, PaaS, SaaS", "Virtualization & Containers", "Cloud Security Principles", "Cost Management"],
      },
      {
        module: "Module 2: Core Cloud Services (AWS)",
        description: "Getting hands-on with Amazon Web Services.",
        topics: ["EC2 & S3", "VPC & Networking", "IAM & Security", "RDS & Databases"],
      },
      {
        module: "Module 3: Scalability & Automation",
        description: "Building resilient and automated systems.",
        topics: ["Auto Scaling & Load Balancing", "Infrastructure as Code (Terraform)", "CI/CD Pipelines", "Serverless with AWS Lambda"],
      },
      {
        module: "Module 4: Containers & Orchestration",
        description: "Modern application deployment.",
        topics: ["Docker Fundamentals", "Containerizing Applications", "Kubernetes (EKS)", "Final Capstone Project"],
      },
    ],
    projects: [
      {
        title: "Scalable Web Server",
        description: "Deploy a web application on AWS with an auto-scaling group and a load balancer.",
        imageId: "project-cloud-1",
      },
      {
        title: "Serverless API",
        description: "Build and deploy a REST API using AWS Lambda and API Gateway.",
        imageId: "project-cloud-2",
      },
    ],
  },
];

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return coursesData.find((course) => course.slug === slug);
}

export async function getInstructorForCourse(course: Course): Promise<Faculty | undefined> {
  return facultyData.find((faculty) => faculty.id === course.instructorId);
}
