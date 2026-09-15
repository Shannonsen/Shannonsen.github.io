export type Profile = {
  name: string
  role: string
  email: string
  country: string
  website: string
  bio: string
}

export const profile: Profile = {
  name: 'Shannon Sen Perdomo',
  role: 'Software Engineer',
  email: 'shannonsenpmo@gmail.com',
  country: 'Mexico',
  website: 'www.about.me',
  bio:
    'I am a Software Engineer, graduated from the Software Engineering program at the ' +
    'Facultad de Matemáticas of the Universidad Autónoma de Yucatán. I build software ' +
    'end to end — from the data model to the interface people actually touch — and I care ' +
    'about the details that make a product feel considered rather than merely finished.',
}
