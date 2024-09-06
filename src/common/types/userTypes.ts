export interface ProfileOption {
  label: string
  data: string | number
}

export interface ProfileData {
  username: ProfileOption
  email: ProfileOption
  password: ProfileOption
  age: ProfileOption
  region: ProfileOption
}