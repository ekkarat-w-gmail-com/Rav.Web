// @flow
import React, { Fragment } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import enTranslations from '../translations/en.json';
import svTranslations from '../translations/sv.json';

import { Header } from './Header';
import { Footer } from './Footer';

// Styling
import '../styling/reset.css';
import '../styling/global.css';

type Props = {
  children: any,
  locale: string
}

addLocaleData([
  ...en,
  ...sv
]);

const Layout = ({ children, locale }: Props) => {

  const translations = {
    'en': enTranslations,
    'sv': svTranslations
  }

  const messages = translations[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Fragment>
        <Header />
        <main>{children}</main>
        <Footer />
      </Fragment>
    </IntlProvider>
  )
}

Layout.defaultProps = {
  locale: 'en'
}

export default Layout
