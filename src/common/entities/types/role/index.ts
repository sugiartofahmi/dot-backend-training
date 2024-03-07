import { PermissionEntitiy } from 'src/common/database';
import { TMetaResponse } from '../common';

export type TRoleRequest = {
  id?: string;
  name: string;
  permissions: PermissionEntitiy[];
};

export type TUserResponse = TMetaResponse<TRoleRequest[]>;

export type TUserSingleResponse = TMetaResponse<TRoleRequest>;
