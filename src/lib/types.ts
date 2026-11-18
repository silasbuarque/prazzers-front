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

// Mirrors com.prazzers.auth.dto.response.UserResponse.
export interface AuthUser {
  id: string
  name: string
  email: string
  age: number
  nationality: string | null
  region: string | null
}
