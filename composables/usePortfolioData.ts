// composables/usePortfolioData.ts
// Composable to access portfolio YAML data with TypeScript typing

import type {
  PersonalInfo,
  Experience,
  Education,
  Certification,
  Volunteering,
  Language,
  Project,
  SocialLink,
} from '~/types'

// Personal data interface matching YAML structure
interface PersonalData {
  name: string
  title: string
  location: string
  email: string
  phone?: string
  profileImage: string
  whatsappMessage?: string
  bio: string[]
  socialLinks: SocialLink[]
  footerText: string
}

// Experience data interface matching YAML structure
interface ExperiencesData {
  summary: string
  experiences: Experience[]
}

// Education data interface matching YAML structure
interface EducationData {
  summary: string
  education: Education[]
  certifications: Certification[]
  volunteering: Volunteering[]
  languages: Language[]
}

// Projects data interface matching YAML structure
interface ProjectsData {
  projects: Project[]
}

export const usePortfolioData = () => {
  // Fetch personal data
  const getPersonalData = async () => {
    const { data } = await useAsyncData('personal', () =>
      queryContent<PersonalData>('/data/personal').findOne()
    )
    return data
  }

  // Fetch experiences data
  const getExperiencesData = async () => {
    const { data } = await useAsyncData('experiences', () =>
      queryContent<ExperiencesData>('/data/experiences').findOne()
    )
    return data
  }

  // Fetch education data
  const getEducationData = async () => {
    const { data } = await useAsyncData('education', () =>
      queryContent<EducationData>('/data/education').findOne()
    )
    return data
  }

  // Fetch projects data
  const getProjectsData = async () => {
    const { data } = await useAsyncData('projects', () =>
      queryContent<ProjectsData>('/data/projects').findOne()
    )
    return data
  }

  // Fetch all portfolio data at once
  const getAllPortfolioData = async () => {
    const [personal, experiences, education, projects] = await Promise.all([
      getPersonalData(),
      getExperiencesData(),
      getEducationData(),
      getProjectsData(),
    ])

    return {
      personal,
      experiences,
      education,
      projects,
    }
  }

  // Helper to get personal info in the PersonalInfo format
  const getPersonalInfo = async (): Promise<Ref<PersonalInfo | null>> => {
    const data = await getPersonalData()

    return computed(() => {
      if (!data.value) return null

      return {
        name: data.value.name,
        title: data.value.title,
        location: data.value.location,
        email: data.value.email,
        phone: data.value.phone,
        bio: data.value.bio,
        socialLinks: data.value.socialLinks,
        profileImage: data.value.profileImage,
        whatsappMessage: data.value.whatsappMessage,
      } as PersonalInfo
    })
  }

  return {
    getPersonalData,
    getExperiencesData,
    getEducationData,
    getProjectsData,
    getAllPortfolioData,
    getPersonalInfo,
  }
}
