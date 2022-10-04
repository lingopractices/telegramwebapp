export type HttpHeaders = { [key: string]: string };

export type UrlGenerator<TBody> = (body: TBody) => string;
