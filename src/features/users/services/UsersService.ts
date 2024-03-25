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

@Service()
export default class UsersService {
  private httpCLient = useHttpClient();

  constructor() {}

  async index(request: IDefaultQueryParams) {
    return this.httpCLient.get<
      CoreResponseDto<PagedContent<FetchUsersResponseDto>>
    >("/v1.0/management/Users/GetAllUsers", { params: request });
  }

  async show(id: number) {
    return this.httpCLient.get<CoreResponseDto<FetchUserDetailsResponseDto>>(
      `/v1.0/management/Users/GetById/${id}`
    );
  }
}
