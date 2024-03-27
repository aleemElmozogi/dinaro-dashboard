export interface IDefaultQueryParams {
  page: number | undefined;
  pageSize: number | undefined;
}

export const DefaultQueryParams: IDefaultQueryParams = {
  page: 1,
  pageSize: 10,
};
