// @flow
import React, { Fragment, useEffect } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';

// Store
import { client } from '../services/shopify';
import { foundCheckout, createCheckout } from '../store/actions/cartActions';

// i18n
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import enTranslations from '../translations/en.json';
import svTranslations from '../translations/sv.json';

// Components
import { Header } from './Header';
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
  createCheckout: (checkout: any) => void,
  foundCheckout: (checkout: any) => void
}

// Add locale data
addLocaleData([
  ...en,
  ...sv
]);


const Layout = ({ children, locale, checkoutId, foundCheckout, createCheckout }: Props) => {

  useEffect(() => {

    if ( checkoutId ) {

      client.checkout.fetch(checkoutId).then((checkout) => {
        foundCheckout(checkout)
      });

    } else {

      client.checkout.create().then((checkout) => {        
        createCheckout(checkout)
      });

    }

    return () => {}
  });

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
        <Cart />
      </Fragment>
    </IntlProvider>
  )
}

Layout.defaultProps = {
  locale: 'sv'
}

const mapStateToProps = (state) => ({
  checkoutId: get('cart.checkout.id', state)
});

export default connect(mapStateToProps, { foundCheckout, createCheckout })(Layout);
