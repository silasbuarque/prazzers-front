export interface Profile {
  id: string
  name: string
  age: number
  nationality: string
  city: string
  region: string
  verified: boolean
  online: boolean
  languages: string[]
  categories: string[]
  about: string
  photoCount: number
}

export interface AuthUser {
  name: string
  email: string
}
