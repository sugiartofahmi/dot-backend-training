import { PermissionEntitiy } from '../../database/entity/permission.entitiy';
import { TMetaResponse } from './common.type';

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
