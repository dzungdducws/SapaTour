// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import en from './locales/en/translation.json';
import vi from './locales/vi/translation.json';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: en,
            },
            vi: {
                translation: vi,
            },
        },
        lng: 'vi', // default language
        interpolation: {
            escapeValue: false, // react already escapes by default
        },
    });

export default i18n;