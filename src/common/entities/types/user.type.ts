import { RoleEntitiy } from '../../database/entity/role.entity';
import { EUserStatus } from '../enums/user.enum';
import { TMetaResponse } from './common.type';

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
