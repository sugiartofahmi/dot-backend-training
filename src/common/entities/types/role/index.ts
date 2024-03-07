import { TMetaResponse } from '../common';

export type TRoleRequest = {
  name: string;
  permissions: string[];
};

export type TUserResponse = TMetaResponse<TRoleRequest[]>;

export type TUserSingleResponse = TMetaResponse<TRoleRequest>;
