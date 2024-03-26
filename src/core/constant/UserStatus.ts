export enum UserStatus {
  Active = 1,
  Blocked,
}

export const getUserStatus = (status: UserStatus) => {
  switch (status) {
    case UserStatus.Active:
      return "مفعل";
    case UserStatus.Blocked:
      return "محظور";
    default:
      return "غير معروف";
  }
};
