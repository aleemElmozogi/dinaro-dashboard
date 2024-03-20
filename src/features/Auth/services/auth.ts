import {  type AxiosInstance, AxiosResponse } from "axios";
import { UserData } from "@/features/Auth/models/UserData.ts";
import { Service } from "typedi";
import { LoginRequestDTO } from "@/features/Auth/models/LoginRequestDTO.ts";
import { useHttpClient } from "@/core/network/useHttpClient.ts";
import CoreResponseDto from "@/core/constant/ICoreResponseDto.ts";
import { CheckActiveTokenRequestDto } from "../models/CheckActiveTokenRequestDto";
import { ResetPasswordRequestDto } from "../models/ResetPasswordRequestDto";

export enum UserActivateState {
  AbleToActivate,
  FailToFind,
  Activated,
}

@Service()
export default class AuthService {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = useHttpClient();
  }

  async login(payload: LoginRequestDTO) {
    return await this.httpClient.post<CoreResponseDto<UserData>>(
      "/api/Auth/Signin",
      payload
    );
  }

  async refreshToken(): Promise<AxiosResponse<CoreResponseDto<any>>> {
    const refreshToken = localStorage.getItem("refreshToken");

    throw new Error("Method not implemented.");
  }

  async checkActiveToken(request: CheckActiveTokenRequestDto) {
    return await this.httpClient.get<CoreResponseDto<UserActivateState>>(
      "/api/Auth/Activate",
      {
        params: request,
      }
    );
  }

  async activateNewPassword(request: ResetPasswordRequestDto) {
    return await this.httpClient.post<CoreResponseDto<number>>(
      "/api/Auth/Activate",
      {},
      {
        params: request,
      }
    );
  }

  async getProfile(): Promise<AxiosResponse<CoreResponseDto<UserData>>> {
    throw new Error("Method not implemented.");
  }

  async logOut(): Promise<AxiosResponse<CoreResponseDto<string>>> {
    throw new Error("Method not implemented.");
  }
}
