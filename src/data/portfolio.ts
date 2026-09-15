export type SkillGroup = {
  label: string
  items: string[]
}

export type ExperienceEntry = {
  company: string
  role: string
  period: string
  summary: string
}

export type Project = {
  name: string
  description: string
  tech: string[]
  url?: string
}

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'] },
  { label: 'Frontend', items: ['React', 'Vite', 'HTML', 'CSS'] },
  { label: 'Backend', items: ['Node.js', 'REST APIs', 'PostgreSQL'] },
  { label: 'Tools', items: ['Git', 'GitHub Actions', 'Docker', 'Figma'] },
]

/*
 * TODO(Shannon): replace these placeholder entries with your real roles.
 * Nothing here is factual — it only exists so the card layout can be reviewed.
 */
export const experience: ExperienceEntry[] = [
  {
    company: 'PLACEHOLDER — your current company',
    role: 'PLACEHOLDER — your title',
    period: 'PLACEHOLDER — e.g. 2024 — Present',
    summary:
      'PLACEHOLDER — one or two sentences on what you own here and what changed because ' +
      'of your work.',
  },
  {
    company: 'PLACEHOLDER — a previous company',
    role: 'PLACEHOLDER — your title',
    period: 'PLACEHOLDER — e.g. 2022 — 2024',
    summary: 'PLACEHOLDER — what you built and what it was for.',
  },
]

/*
 * TODO(Shannon): replace these placeholder entries with your real projects.
 * Nothing here is factual — it only exists so the card layout can be reviewed.
 */
export const projects: Project[] = [
  {
    name: 'PLACEHOLDER — project name',
    description:
      'PLACEHOLDER — what the project does and why you built it, in one or two sentences.',
    tech: ['React', 'TypeScript'],
    url: undefined,
  },
  {
    name: 'PLACEHOLDER — another project',
    description: 'PLACEHOLDER — what it does and what was interesting about building it.',
    tech: ['Node.js', 'PostgreSQL'],
    url: undefined,
  },
]
