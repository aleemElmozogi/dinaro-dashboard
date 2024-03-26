export enum CoreResponseType {
  none,
  success,
  failure,
  techError,
  unauthorized,
}

export default interface CoreResponseDto<T> {
  type: CoreResponseType;
  content: T;
  message: string;
}
