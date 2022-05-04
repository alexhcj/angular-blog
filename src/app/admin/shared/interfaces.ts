export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Post {
  id?: string
  category: string
  title: string
  text: string
  author: string
  date: Date
  tags: string[]
}

export interface FbCreateResponse {
  name: string
}
