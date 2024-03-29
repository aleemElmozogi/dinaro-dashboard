export enum ETransactionType {
  All = 0,
  Withdraw = 1,
  Deposit = 2,
  Transfer = 3,
  Payment = 4,
  Received = 5,
}

export const getTransactionType = (value: ETransactionType) => {
  switch (value) {
    case ETransactionType.All:
      return "الكل";
    case ETransactionType.Withdraw:
      return "سحب";
    case ETransactionType.Deposit:
      return "إيداع";
    case ETransactionType.Transfer:
      return "تحويل";
    case ETransactionType.Payment:
      return "دفع";
    case ETransactionType.Received:
      return "تحويل";
    default:
      return "";
  }
};

export const getTransactionTypeOptions =  [
    { label: "الكل", value: ETransactionType.All },
    { label: "سحب", value: ETransactionType.Withdraw },
    { label: "إيداع", value: ETransactionType.Deposit },
    { label: "تحويل", value: ETransactionType.Transfer },
    { label: "دفع", value: ETransactionType.Payment },
    // { label: "استلام", value: ETransactionType.Received },
  ];

