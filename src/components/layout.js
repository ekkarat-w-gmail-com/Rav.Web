// @flow
import React, { Fragment } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl';

// i18n
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import enTranslations from '../translations/en.json';
import svTranslations from '../translations/sv.json';

// Components
import { Header, CheckoutHeader } from './Header';
import { Footer } from './Footer';
import { Cart } from './Cart/Cart';

// Styling
import '../styling/reset.css';
import '../styling/global.css';

// Types
type Props = {
  children: any,
  locale: string,
  checkoutId: any,
  useCheckoutLayout?: boolean,
  createCheckout: (checkout: any) => void,
  foundCheckout: (checkout: any) => void
}

// Add locale data
addLocaleData([
  ...en,
  ...sv
]);


const Layout = ({ children, locale, checkoutId, useCheckoutLayout, foundCheckout, createCheckout }: Props) => {

  const translations = {
    'en': enTranslations,
    'sv': svTranslations
  }

  const messages = translations[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Fragment>
        {!useCheckoutLayout && <Header />}
        {useCheckoutLayout && <CheckoutHeader />}
        <main className={'main'}>{children}</main>
        {!useCheckoutLayout && <Footer />}
        <Cart />
      </Fragment>
    </IntlProvider>
  )
}

Layout.defaultProps = {
  locale: 'en',
  useCheckoutLayout: false
}

export default Layout;
