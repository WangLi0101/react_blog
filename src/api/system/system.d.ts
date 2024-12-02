export interface PageResult<T> {
  list: T[];
  total: number;
}
export interface CreateUserParams {
  username: string;

  password: string;

  gender: number;

  avatar?: string;

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
  id: number;
  username: string;
  profile: Profile;
  roles: Role[];
}

export interface PageParams {
  page: number;
  pageSize: number;
  username: string;
}

export type PageUser = PageResult<UserInfo>;
