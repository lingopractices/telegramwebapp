export const locales: { [key: string]: () => Promise<any> } = {
  ru: () => import('dayjs/locale/ru'),
  en: () => import('dayjs/locale/en'),
};
