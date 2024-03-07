import { EOrderBy, EUserSortingBy, EUserStatus } from '../../enums';
export type TMetaResponse<T = null | undefined> = {
  message?: string;
  data?: T;
  errors?: Array<{ message: string }>;
  meta?: {
    total?: number;
    totalPage?: number;
    lastPage?: number;
    currentPage?: number;
    perPage?: number;
    prev?: null | number;
    next?: null | number;
  };
};

export type TPaginationRequest = {
  page?: string;
  perPage?: string;
  orderBy?: EOrderBy;
  sortingBy?: EUserSortingBy;
  search?: string;
  status?: EUserStatus;
};
