import dayjs from 'dayjs';
import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    debug: false,
    initImmediate: false,
    fallbackLng: 'en',
    ns: 'translation',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/{{ns}}/{{lng}}.json',
    },
  })
  .then(() => {
    dayjs.locale(i18n.language);
  });

export default i18n;
