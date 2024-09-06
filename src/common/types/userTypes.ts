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


export interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
  age: number | null;
  region: string | null;
}

export interface User {
  _id: number;
  username: string;
  email: string;
  password: string;
  age: number | null;
  region: string | null;
}