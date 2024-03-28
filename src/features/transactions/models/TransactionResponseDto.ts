import { TransactionState } from "@/core/constant/ETransactionState";
import { ETransactionType } from "@/core/constant/ETransactionType";

export interface TransactionResponseDto {
  id: string;
  senderName: string;
  receiverName: string;
  amount: number;
  fee: number;
  status: TransactionState;
  type: ETransactionType;
  createdAt: string;
}

export interface WithdrawRequest {
  id: string;
  title: string;
  fee: number;
  transactionDate: string;
  amount: number;
  transactionType: ETransactionType;
}
