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
      loadPath: './src/{{ns}}/{{lng}}.json',
    },
  });

export default i18n;
