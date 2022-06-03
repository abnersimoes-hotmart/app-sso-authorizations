import { IProductInformation } from 'utils/interfaces/productInformation'

export interface IFetchSort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface IPageable {
  sort: IFetchSort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IFetchObject {
  pageable: IPageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  sort: IFetchSort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
}

export interface IFetchProductstQuery extends IFetchObject {
  content: IProductInformation[];
}
