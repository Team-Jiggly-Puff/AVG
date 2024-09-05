export interface ProfileOption {
  label: string
  data: string
}

export interface ProfileData {
  firstName: ProfileOption
  lastName: ProfileOption
  dateOfBirth: ProfileOption
  city: ProfileOption
  state: ProfileOption
}