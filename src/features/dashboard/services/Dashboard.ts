import { useHttpClient } from "@/core/network/useHttpClient";
import { Service } from "typedi";
import { Statis } from "../models/statis";
import CoreResponseDto from '@/core/constant/ICoreResponseDto';

@Service()
export default class DashboardService {
  private httpCLient = useHttpClient();

  constructor() {}

  async statis() {
    return (
      this.httpCLient.get<CoreResponseDto<Statis>>("/v1.0/management/Home")
    );
  }
}
