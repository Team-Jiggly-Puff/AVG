export interface ProfileOption {
  label: string
  data: string
}

export interface ProfileData {
  firstName: ProfileOption
  lastName: ProfileOption
  username: ProfileOption
  email: ProfileOption
  age: ProfileOption
  dateOfBirth: ProfileOption
  city: ProfileOption
  state: ProfileOption
  region: ProfileOption
}