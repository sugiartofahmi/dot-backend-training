import { EUserStatus } from '../../enums';
import { TMetaResponse } from '../common';

export type TUserRequest = {
  id?: string;
  fullname: string;
  email?: string;
  password: string;
  status?: EUserStatus;
};

export type TUserResponse = TMetaResponse<TUserRequest[]>;

export type TUserSingleResponse = TMetaResponse<TUserRequest>;
