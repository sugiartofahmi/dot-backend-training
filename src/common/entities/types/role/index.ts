import { PermissionEntitiy } from 'src/common/database';
import { TMetaResponse } from '../common';

export type TRoleRequest = {
  id?: number;
  name: string;
  permissions?: PermissionEntitiy[];
};

export type TRoleResponse = TMetaResponse<TRoleRequest[]>;

export type TRoleSingleResponse = TMetaResponse<TRoleRequest>;
