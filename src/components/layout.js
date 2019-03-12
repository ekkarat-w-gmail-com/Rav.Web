// @flow
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';

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
  useCheckoutLayout?: boolean,
  getCart: () => void
}

const Layout = ({ children, locale, checkoutId, useCheckoutLayout, getCart }: Props) => {

  useEffect(() => {
    getCart();
  }, [ children ]);

  return (
    <Fragment>
      {!useCheckoutLayout && <Header />}
      {useCheckoutLayout && <CheckoutHeader />}
      <main className={'main'}>{children}</main>
      {!useCheckoutLayout && <Footer />}
      <Cart />
    </Fragment>
  )
}

Layout.defaultProps = {  
  useCheckoutLayout: false
}

const mapStoreToProps = (store) => ({});
export default connect(mapStoreToProps, { getCart })(Layout);
