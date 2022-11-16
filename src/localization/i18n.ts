import dayjs from 'dayjs';
import { locales } from 'dayjs/locales';
import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n.on('languageChanged', (language: string) => {
  locales[language]().then(() => {
    dayjs.locale(language);
  });
});

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    debug: false,
    initImmediate: false,
    fallbackLng: ['en', 'ru'],
    ns: 'translation',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/{{ns}}/{{lng}}.json',
    },
  });

export default i18n;
