import { useHttpClient } from "@/core/network/useHttpClient";
import { Service } from "typedi";
import CoreResponseDto from "../../../core/constant/ICoreResponseDto";
import PagedContent from "@/core/constant/IPagedContent";

import { TransactionResponseDto } from "../models/TransactionResponseDto";
import { ITransactionsRequestDto } from "../models/TransactionsRequestDto";

@Service()
export default class TranactionsService {
  private httpCLient = useHttpClient();

  constructor() {}

  async index(request: ITransactionsRequestDto) {
    return this.httpCLient.get<
      CoreResponseDto<PagedContent<TransactionResponseDto>>
    >("/v1.0/management/Transactions", { params: request });
  }
}
