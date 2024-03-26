import { useHttpClient } from "@/core/network/useHttpClient";
import { Service } from "typedi";
import CoreResponseDto from "../../../core/constant/ICoreResponseDto";
import PagedContent from "@/core/constant/IPagedContent";
import {
  FetchUserDetailsResponseDto,
  FetchUsersRequestDto,
  FetchUsersResponseDto,
} from "../models/fetchUsersDto";
import { IDefaultQueryParams } from "@/core/constant/DefaultQueryParams";
import { UserStatus } from "@/core/constant/UserStatus";

@Service()
export default class UsersService {
  private httpCLient = useHttpClient();

  constructor() {}

  async index(request: IDefaultQueryParams) {
    return this.httpCLient.get<
      CoreResponseDto<PagedContent<FetchUsersResponseDto>>
    >("/v1.0/management/Users", { params: request });
  }

  async show(id: string) {
    return this.httpCLient.get<CoreResponseDto<FetchUserDetailsResponseDto>>(
      `/v1.0/management/Users/${id}`
    );
  }

  async changeStatus(id: string) {
    return this.httpCLient.put<CoreResponseDto<string>>(
      `/v1.0/management/Users/${id}/change-status`
    );
  }
}
