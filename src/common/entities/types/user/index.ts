import { RoleEntitiy } from 'src/common/database';
import { EUserStatus } from '../../enums';
import { TMetaResponse } from '../common';

export type TUser = {
  id: string;
  fullname: string;
  email: string;
  password: string;
  status: EUserStatus | string;
  roles: RoleEntitiy[];
};

export type TCreateUserRequest = {
  fullname: string;
  email: string;
  password: string;
  roles?: RoleEntitiy[];
};

export type TUpdateUserRequest = {
  id?: string;
  fullname?: string;
  email?: string;
  password?: string;
  roles?: RoleEntitiy[];
};
export type TUserResponse = TMetaResponse<TUser[]>;

export type TUserSingleResponse = TMetaResponse<TUser>;
