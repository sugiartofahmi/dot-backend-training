import { TMetaResponse } from '../common';

export type TPermission = {
  id: number;
  name: string;
};

export type TCreatePermissionRequest = {
  name: string;
};

export type TUpdatePermissionRequest = TCreatePermissionRequest & {
  id?: number;
};

export type TPermissionResponse = TMetaResponse<TPermission[]>;

export type TPermissionSingleResponse = TMetaResponse<TPermission>;
