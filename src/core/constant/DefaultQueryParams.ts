export interface IDefaultQueryParams {
  pageNumber: number | undefined;
  pageSize: number | undefined;
}

export const DefaultQueryParams: IDefaultQueryParams = {
  pageNumber: 1,
  pageSize: 10,
};
