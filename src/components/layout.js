// @flow
import React, { Fragment, useEffect } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';

// i18n
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import enTranslations from '../translations/en.json';
import svTranslations from '../translations/sv.json';

import { getCart } from '../store/actions/cartActions';

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
  useCheckoutLayout?: boolean,
  getCart: () => void
}

// Add locale data
addLocaleData([
  ...en,
  ...sv
]);


const Layout = ({ children, locale, checkoutId, useCheckoutLayout, getCart }: Props) => {

  useEffect(() => {
    getCart();
  }, [ children ]);

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

const mapStoreToProps = (store) => ({});

export default connect(mapStoreToProps, { getCart })(Layout);
