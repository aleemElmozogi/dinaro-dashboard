export enum TransactionState {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export const getTransactionState = (value: TransactionState) => {
  switch (value) {
    case TransactionState.Pending:
      return "في الانتظار";
    case TransactionState.Approved:
      return "تمت الموافقة";
    case TransactionState.Rejected:
      return "تم الرفض";
    default:
      return "";
  }
};

export const getTransactionStateOptions = [
  { label: "في الانتظار", value: TransactionState.Pending },
  { label: "تمت الموافقة", value: TransactionState.Approved },
  { label: "تم الرفض", value: TransactionState.Rejected },
];
