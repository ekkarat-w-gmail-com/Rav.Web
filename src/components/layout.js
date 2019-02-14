// @flow
import React, { Fragment } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import { Header } from './Header';
import { Footer } from './Footer';

// Styling
import '../styling/reset.css';
import '../styling/global.css';

type Props = {
  children: any,
  locale?: string
}

addLocaleData([
  ...en,
  ...sv
]);

const Layout = ({ children, locale }: Props) => (
  <IntlProvider locale={locale}>
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  </IntlProvider>
)

Layout.defaultProps = {
  locale: 'en'
}

export default Layout
