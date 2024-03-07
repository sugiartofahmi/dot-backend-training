import { TMetaResponse } from '../common';

export type TUserRequest = {
  fullname: string;
  email: string;
  password: string;
  status?: string;
};

export type TUserResponse = TMetaResponse<TUserRequest[]>;

export type TUserSingleResponse = TMetaResponse<TUserRequest>;
