export interface CreateUserParams {
  username: string;

  password: string;

  gender: number;

  avatar: string;

  email: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface Role {
  id: number;
  name: string;
  key: string;
}

export interface Profile {
  gender: number;

  avatar: string;

  email: string;
}

export interface UserInfo {
  username: string;
  profile: Profile;
  roles: Role[];
}
