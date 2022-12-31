import { AxiosError } from 'axios';

export enum AxiosErros {
  Cancelled = 'ERR_CANCELED',
}

export function isNetworkError(error: AxiosError): boolean {
  return error.message === 'Network Error';
}
