import { IDefaultQueryParams } from "@/core/constant/DefaultQueryParams";

export interface ITransactionsRequestDto extends IDefaultQueryParams {
  phoneNumber: string | undefined;
  state: 0 | undefined;
  from: string | undefined;
  to: string | undefined;
}

export const DefaultTransactionsRequestDto: ITransactionsRequestDto = {
    page: 1,
    pageSize: 10,
    phoneNumber: undefined,
    state: undefined,
    from: undefined,
    to: undefined,
}
