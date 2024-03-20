import { useHttpClient } from "@/core/network/useHttpClient";
import { Service } from "typedi";
import CoreResponseDto from "../../../core/constant/ICoreResponseDto";
import PagedContent from "@/core/constant/IPagedContent";
import {
  FetchUsersRequestDto,
  FetchUsersResponseDto,
} from "../models/fetchUsersDto";

@Service()
export default class UsersService {
  private httpCLient = useHttpClient();

  constructor() {}

  async index(request: FetchUsersRequestDto) {
    return this.httpCLient.get<
      CoreResponseDto<PagedContent<FetchUsersResponseDto>>
    >("/api/Users", { params: request });
  }

  async show(id: number) {
    return this.httpCLient.get<CoreResponseDto<FetchUsersResponseDto>>(
      `/api/Users/${id}`
    );
  }
}
