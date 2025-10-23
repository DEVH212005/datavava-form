import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./locales/en.json";
import vi from "./locales/vi.json"; 
import jp from "./locales/jp.json";

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
  jp: {
    translation: jp,
  },
};

i18n.use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false,
    },
    resources,
    fallbackLng: 'en',
    lng: 'en',
  });

export default i18n;
