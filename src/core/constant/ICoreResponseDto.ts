export enum CoreResponseType {
  none,
  success,
  failure,
  techError,
  unauthorized,
}

export default interface CoreResponseDto<T> {
  resultType: CoreResponseType;
  content: T;
  message: string;
}
