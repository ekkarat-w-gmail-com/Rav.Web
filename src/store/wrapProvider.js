import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl';

// i18n
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import enTranslations from '../translations/en';
import svTranslations from '../translations/sv';

import { createStore, sagaMiddleware } from './index';
import { rootSaga } from './sagas';

// Add locale data
addLocaleData([
  ...en,
  ...sv
]);

// Create redux store
const store = createStore();

// Run saga
sagaMiddleware.run(rootSaga);

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {

  const translations = {
    'en': enTranslations,
    'sv': svTranslations
  }

  const messages = translations['sv'];

  return (
    <IntlProvider locale={'sv'} messages={messages}>
      <Provider store={store}>{element}</Provider>
    </IntlProvider>
  )
}
