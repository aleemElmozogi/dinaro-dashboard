export enum ETransactionType {
  Withdraw = 1,
  Deposit = 2,
  Transfer = 3,
  Payment = 4,
  Received = 5,
}

export const getTransactionType = (value: ETransactionType) => {
  switch (value) {
    case ETransactionType.Withdraw:
      return "سحب";
    case ETransactionType.Deposit:
      return "إيداع";
    case ETransactionType.Transfer:
      return "تحويل";
    case ETransactionType.Payment:
      return "دفع";
    case ETransactionType.Received:
      return "استلام";
    default:
      return "";
  }
};

export const getTransactionTypeOptions =  [
    { label: "سحب", value: ETransactionType.Withdraw },
    { label: "إيداع", value: ETransactionType.Deposit },
    { label: "تحويل", value: ETransactionType.Transfer },
    { label: "دفع", value: ETransactionType.Payment },
    { label: "استلام", value: ETransactionType.Received },
  ];

