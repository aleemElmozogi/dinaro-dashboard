import { IDefaultQueryParams } from "@/core/constant/DefaultQueryParams";
import { TransactionState } from "@/core/constant/ETransactionState";
import { ETransactionType } from "@/core/constant/ETransactionType";

export interface ITransactionsRequestDto extends IDefaultQueryParams {
  phoneNumber: string | undefined;
  state: TransactionState | undefined;
  type: ETransactionType | undefined;
  from: string | undefined;
  to: string | undefined;
}

export const DefaultTransactionsRequestDto: ITransactionsRequestDto = {
    page: 1,
    pageSize: 10,
    phoneNumber: undefined,
    state: undefined,
    type: undefined,
    from: undefined,
    to: undefined,
}
