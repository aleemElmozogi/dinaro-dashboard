import { IDefaultQueryParams } from "@/core/constant/DefaultQueryParams";
import { DefaultQueryParams } from "../../../core/constant/DefaultQueryParams";
import { UserStatus } from "@/core/constant/UserStatus";

export interface FetchUsersRequestDto extends IDefaultQueryParams {
  search: string;
}

export const DefaultFetchUsersRequestDto: FetchUsersRequestDto = {
  ...DefaultQueryParams,
  search: "",
};

export interface FetchUsersResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  numberOfFriends: number;
  numberOfWallets: number;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  dateOfBirthString: string;
  createdAtString: string;
  status: UserStatus
}


export interface WalletTypeResponseDto {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

}

export interface UserWalletDto {
  id:string ,
  balance: number,
  createdAt: string,
  updatedAt: string,
  walletTypeId: string,
  walletTypeName: string,
}

export interface FetchUserDetailsResponseDto extends FetchUsersResponseDto {
  friends: FetchUsersResponseDto[];
  wallets: UserWalletDto[];
}
