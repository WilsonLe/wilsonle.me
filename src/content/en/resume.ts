import type { Education, Experience, ResumeContent } from '@/content/types'
import { siteSettings } from '@/content/en/site'

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Forward Deployed Engineer',
    company: 'Lyra',
    employmentType: 'Full-time',
    duration: '1 mo',
    location: 'Brisbane, Queensland, Australia · Hybrid',
    startDate: '2026-09-01',
    current: true,
  },
  {
    id: '2',
    title: 'Software Engineer',
    company: 'Pangea Chat',
    employmentType: 'Full-time',
    duration: '3 yrs',
    summary: 'AI-powered language learning via chat with friends',
    location: 'Richmond, Virginia, United States',
    startDate: '2023-05-01',
    endDate: '2026-04-30',
    current: false,
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'CYOBot',
    employmentType: 'Full-time',
    duration: '6 mos',
    summary: 'Robotics learning platform',
    location: 'Dover, Delaware, United States',
    startDate: '2022-12-01',
    endDate: '2023-05-01',
    current: false,
  },
  {
    id: '4',
    title: 'Software Engineer',
    company: 'Designer Brands',
    employmentType: 'Full-time',
    duration: '8 mos',
    summary: 'Cloud application engineering team',
    location: 'Columbus, Ohio, United States',
    startDate: '2022-05-01',
    endDate: '2022-12-01',
    current: false,
  },
]

export const education: Education[] = [
  {
    id: '1',
    institution: 'University of Southern Queensland',
    degree: 'Master of Information Systems',
    location: 'Queensland, Australia',
    graduationDate: '2027-08-01',
    coursework: ['Management of Cyber Security', 'Systems Analysis and Design'],
  },
  {
    id: '2',
    institution: 'Denison University',
    degree: 'Bachelor of Science in Computer Science',
    location: 'Granville, Ohio',
    graduationDate: '2024-05-01',
    gpa: '3.52/4.00',
    coursework: [
      'Data Structures',
      'Algorithm Design and Analysis',
      'Data Systems',
      'Computer Systems',
      'Operating Systems',
      'Parallel Computing',
      'Quantum Computing',
      'Artificial Intelligence',
      'Statistics',
    ],
  },
]

export const resumeContent: ResumeContent = {
  locale: 'en',
  siteSettings,
  intro: {
    eyebrow: 'Résumé',
    heading: 'Experience',
    summary: 'A concise record of my work.',
    backLabel: 'Back to portfolio',
  },
  labels: {
    experienceHeading: 'Experience',
    educationHeading: 'Education',
    presentLabel: 'Present',
    expectedGraduationLabel: 'Expected Graduation',
    graduatedLabel: 'Graduated',
    gpaLabel: 'GPA',
    courseworkLabel: 'Relevant Coursework',
  },
  experiences,
  education,
  seo: {
    title: `Résumé | ${siteSettings.name}`,
    description: `Work experience for ${siteSettings.name}, a forward deployed engineer based in Brisbane.`,
  },
}
