import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules} from 'react-native';

import translationEn from './en/index';
import translationKo from './ko/index';

export const defaultNS = 'common';

const resources = {
  en: translationEn,
  ko: translationKo,
} as const;

//@ts-ignore
let userLanguage =
  NativeModules.SettingsManager.settings.AppleLocale ||
  NativeModules.SettingsManager.settings.AppleLanguages[0] ||
  NativeModules.I18nManager.localeIdentifier; // Android
console.log(userLanguage);
userLanguage = userLanguage.includes('ko') ? 'ko' : 'en';
console.log(userLanguage);

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  ns: Object.keys(translationEn),
  lng: userLanguage || 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
