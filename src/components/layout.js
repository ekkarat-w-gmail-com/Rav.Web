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
import type { Cart as CartType } from '../types/cart'
type Props = {
  children: any,
  cart: CartType,
  useCheckoutLayout?: boolean,
  getCart: () => void
}

const Layout = ({ children, locale, useCheckoutLayout, getCart }: Props) => {

  useEffect(() => {
    getCart();
  }, [ window.location.href ]);

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

const mapStoreToProps = (store) => ({
  cart: store.cart
});
export default connect(mapStoreToProps, { getCart })(Layout);
