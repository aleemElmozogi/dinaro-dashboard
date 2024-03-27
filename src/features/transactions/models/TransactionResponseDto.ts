export interface TransactionResponseDto {
  id: string;
  senderName: string;
  receiverName: string;
  amount: number;
  fee: number;
  status: 0;
  type: 1;
  createdAt: string;
}
