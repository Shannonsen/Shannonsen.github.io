export const SECTIONS = ['Skills', 'Experience', 'Projects'] as const

export type Section = (typeof SECTIONS)[number]
export type Filter = 'All' | Section

export const FILTERS: Filter[] = ['All', ...SECTIONS]
