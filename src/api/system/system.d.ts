import { Gender } from "./system.enum";
export type Exact<T, Shape> = T & Record<Exclude<keyof T, keyof Shape>, never>;
export interface PageResult<T> {
  list: T[];
  total: number;
}
export interface CreateUserParams {
  username: string;

  password: string;

  name: string;

  gender: Gender;

  avatar?: string;

  email: string;
}

export interface LoginParams {
  username: string;
  password: string;
  code: string;
  codeId: string;
}

export interface Role {
  id: number;
  name: string;
  key: string;
}

export interface Profile {
  name: string;

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

export interface MenuItem {
  id: number;
  path: string;
  title: string;
  icon: string;
  isHidden: boolean;
  parentId: number | null;
  component: string;
}

export interface Code {
  code: string;
  codeId: string;
}
