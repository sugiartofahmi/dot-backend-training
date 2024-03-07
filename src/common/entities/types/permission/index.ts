import { TMetaResponse } from '../common';

export type TPermissionRequest = {
  id?: number;
  name: string;
};

export type TPermissionResponse = TMetaResponse<TPermissionRequest[]>;

export type TPermissionSingleResponse = TMetaResponse<TPermissionRequest>;
