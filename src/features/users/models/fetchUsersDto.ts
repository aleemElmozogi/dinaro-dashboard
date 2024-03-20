import { IDefaultQueryParams } from "@/core/constant/DefaultQueryParams";

export interface FetchUsersRequestDto extends IDefaultQueryParams {
  search: string;
}

export const DefaultFetchUsersRequestDto: FetchUsersRequestDto = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
};

export interface FetchUsersResponseDto {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
}
