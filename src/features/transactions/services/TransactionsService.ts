import { useHttpClient } from "@/core/network/useHttpClient";
import { Service } from "typedi";
import CoreResponseDto from "../../../core/constant/ICoreResponseDto";
import PagedContent from "@/core/constant/IPagedContent";

import {
  TransactionResponseDto,
  WithdrawRequest,
} from "../models/TransactionResponseDto";
import { ITransactionsRequestDto } from "../models/TransactionsRequestDto";
import { IDefaultQueryParams } from "@/core/constant/DefaultQueryParams";
import { TransactionState } from "@/core/constant/ETransactionState";

@Service()
export default class TranactionsService {
  private httpCLient = useHttpClient();

  constructor() {}

  async index(request: ITransactionsRequestDto) {
    return this.httpCLient.get<
      CoreResponseDto<PagedContent<TransactionResponseDto>>
    >("/v1.0/management/Transactions", { params: request });
  }

  async withdrawRequest(request: IDefaultQueryParams) {
    return this.httpCLient.get<CoreResponseDto<PagedContent<WithdrawRequest>>>(
      "/v1.0/management/Transactions/withdraw-requests",
      { params: request }
    );
  }

  async changeState(id: string, state: TransactionState) {
    return this.httpCLient.put<CoreResponseDto<string>>(
      `/v1.0/management/Transactions/${id}/change-status`,
      {},
      {
        params: { state },
      }
    );
  }
}
