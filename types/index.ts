// types/index.ts - TypeScript interfaces for portfolio data

export interface Experience {
  id: string
  company: string
  role: string
  period: {
    start: string // "05/2024"
    end: string | 'Presente'
  }
  description: string
  achievements: string[]
  technologies: string[]
  companyUrl?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  course: string
  period: {
    start: string
    end: string
  }
  activities?: string[]
}

export interface Certification {
  id: string
  name: string
  provider: string
  date: string
  url?: string
}

export interface Volunteering {
  id: string
  role: string
  organization: string
  period: {
    start: string
    end: string
  }
}

export interface Project {
  id: string
  name: string
  description: string
  period: {
    start: string
    end: string | 'Presente'
  }
  technologies: string[]
  url?: string
  github?: string
  image?: string
}

export interface Language {
  name: string
  level: string
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic'
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'whatsapp' | 'email'
  url: string
  label: string
  icon?: string
}

export interface PersonalInfo {
  name: string
  title: string
  location: string
  email: string
  phone?: string
  bio: string[]
  socialLinks: SocialLink[]
  profileImage: string
  whatsappMessage?: string
}

export interface BlogPost {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  image?: string
  readingTime?: number
}

// Aggregated data types for YAML files
export interface ExperiencesData {
  summary: string
  experiences: Experience[]
}

export interface EducationData {
  summary: string
  education: Education[]
  certifications: Certification[]
  volunteering: Volunteering[]
  languages: Language[]
}

export interface ProjectsData {
  projects: Project[]
}

export interface AboutData {
  sections: {
    id: string
    title?: string
    content: string
  }[]
}

export interface Skill {
  name: string
  category: 'backend' | 'frontend' | 'database' | 'devops' | 'cloud' | 'architecture' | 'methodology' | 'design' | 'documentation'
}

export interface SkillsData {
  proficient: Skill[]
  intermediate: Skill[]
  beginner: Skill[]
}
