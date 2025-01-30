// types.ts
export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  isRemote: boolean;
  responsibilities: string[];
  techStack: string[];
}

export interface Project {
  name: string;
  techStack: string[];
  achievements: string[];
  link: string;
}

export interface ResumeData {
  contact: {
    email: string;
    mobile: string;
    location: string;
  };
  skills: {
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    languages: string[];
  };
  workExperience: WorkExperience[];
  projects: Project[];
  summary: string;
  socialProfiles: {
    github: string;
    linkedin: string;
  };
  education: {
    institution: string;
    degree: string;
    duration: string;
    cgpa: number;
  };
}

// resume.json
export const resumeData: ResumeData = {
  contact: {
    email: "patisantosh00@gmail.com",
    mobile: "+91-6371195118",
    location: "Odisha, India"
  },
  skills: {
    frontend: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React.js", "Next.js"],
    backend: ["Node.js", "Express"],
    databases: ["PostgreSQL", "MongoDB", "Redis"],
    devops: ["Kubernetes", "Docker", "Kafka", "AWS", "Git", "GitHub"],
    languages: ["JavaScript", "Java", "C", "Python"]
  },
  workExperience: [
    {
      company: "Intelligent Cloud Applications",
      role: "Frontend Developer",
      duration: "July 2023 - October 2023",
      isRemote: true,
      responsibilities: [
        "Developed and maintained user interfaces",
        "Collaborated with teams to implement new features and improvements",
        "Optimized code for better performance and user experience",
        "Participated in code reviews and provided feedback"
      ],
      techStack: ["React.js", "Tailwind CSS", "Git", "GitHub"]
    }
  ],
  projects: [
    {
      name: "Medium-Clone-Blogging-website",
      techStack: ["React.js", "Hono", "PostgreSQL", "Cloudflare"],
      achievements: [
        "Developed a full-featured platform with a responsive React.js frontend",
        "Implemented efficient routing with Hono",
        "Ensured robust data management using PostgreSQL",
        "Enhanced performance and security via Cloudflare"
      ],
      link: "medium-blog-hono-peach.vercel.app"
    },
    {
      name: "Realtime Code Editor using Docker",
      techStack: ["WebSocket", "Node.js", "Express", "Socket.io", "React.js", "Docker"],
      achievements: [
        "Enabled real-time collaboration with live updates",
        "Improved the coding experience with syntax highlighting",
        "Ensured smooth performance and reliability"
      ],
      link: "github.com/Santosh9009/Code"
    },
    {
      name: "Threads Clone",
      techStack: ["Next.js", "MongoDB"],
      achievements: [
        "Created a functional clone with user authentication, posting, and commenting features",
        "Ensured efficient data handling and real-time updates"
      ],
      link: "github.com/Santosh9009/Thread-clone"
    }
  ],
  summary: "Full Stack Web Developer experienced in MERN stack, Java, PostgreSQL, Prisma, and Next.js. Skilled in designing and maintaining web applications. Seeking a full-time role to leverage my expertise.",
  socialProfiles: {
    github: "github.com/Santosh9009",
    linkedin: "linkedin.com/in/santosh-pati-66888a272"
  },
  education: {
    institution: "Government College of Engineering, Kalahandi Bhawanipatna, India",
    degree: "Bachelor of Technology - Computer Science and Engineering",
    duration: "December 2021 - Present",
    cgpa: 8.14
  }
}