import { TMetaResponse } from '../common';

export type TPermissionRequest = {
  name: string;
  description: string;
};

export type TUserResponse = TMetaResponse<TPermissionRequest[]>;

export type TUserSingleResponse = TMetaResponse<TPermissionRequest>;
