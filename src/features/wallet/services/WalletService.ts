import { useHttpClient } from "@/core/network/useHttpClient";
import { Service } from "typedi";
import CoreResponseDto from "../../../core/constant/ICoreResponseDto";
import PagedContent from "@/core/constant/IPagedContent";

import { IDefaultQueryParams } from "@/core/constant/DefaultQueryParams";
import { WalletResponseDto } from "../models/WalletResponseDto";

@Service()
export default class WalletService {
  private httpCLient = useHttpClient();

  constructor() {}

  async index(request: IDefaultQueryParams) {
    return this.httpCLient.get<
      CoreResponseDto<PagedContent<WalletResponseDto>>
    >("/v1.0/management/Wallets", { params: request });
  }

  async show(id: string) {
    return this.httpCLient.get<CoreResponseDto<WalletResponseDto>>(
      `/v1.0/management/Wallets/${id}`
    );
  }

  async create() {
    return this.httpCLient.post<CoreResponseDto<string>>(
      `/v1.0/management/Wallets`
    );
  }
  async charge(walletId: string, amount: number) {
    return this.httpCLient.put<CoreResponseDto<string>>(
      `/v1.0/management/Wallets/${walletId}/charge`,
      {},
      {
        params: { amount },
      }
    );
  }
}
