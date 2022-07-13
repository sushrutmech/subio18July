export interface ApiResultDto<T> {
    isSuccess: boolean;
    result: T;
    errorMessage: string;
}