import { TMetaResponse } from '../common';

export type TPermissionRequest = {
  id?: string;
  name: string;
};

export type TUserResponse = TMetaResponse<TPermissionRequest[]>;

export type TUserSingleResponse = TMetaResponse<TPermissionRequest>;
