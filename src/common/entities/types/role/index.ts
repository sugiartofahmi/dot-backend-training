import { PermissionEntitiy } from 'src/common/database';
import { TMetaResponse } from '../common';

export type TRole = {
  id: number;
  name: string;
  permissions?: PermissionEntitiy[];
};

export type TCreateRoleRequest = {
  name: string;
  permissions?: PermissionEntitiy[];
};

export type TUpdateRoleRequest = TCreateRoleRequest & {
  id?: number;
};

export type TRoleResponse = TMetaResponse<TRole[]>;

export type TRoleSingleResponse = TMetaResponse<TRole>;
