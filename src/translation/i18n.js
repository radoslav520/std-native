import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { AsyncStorage } from 'react-native';

import translationEN from './translation.en.json';
import translationDE from './translation.de.json';

const resources = {
  en: {
    translation: translationEN
  },
  de: {
    translation: translationDE
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    languages: ['en', 'de'],
    keySeparator: '.',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

//Functions that store and get data form AsyncStorage
const STORAGE_KEY = '@APP:languageCode';

retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value != null) {
      i18n.changeLanguage(value);
    } else {
      i18n.changeLanguage('en');
    }
  } catch (error) {
    console.log(error);
  }
};

retrieveData();

export default i18n;
