// @flow
import React from 'react';
import { getOr, map } from 'lodash/fp';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

// Actions
import { setCartVisibility } from '../../store/actions';

// Components
import { CartItem } from './CartItem'
import { Drawer } from '../Drawer';
import { DoublePica, Minion } from '../../styling/typography';

// Types
type Props = {
  isOpen: boolean,
  items: Array<any>,
  checkoutUrl: string,
  setCartVisibility: (bool: boolean) => void
}

export const CartDrawer = ({ isOpen, items, setCartVisibility, checkoutUrl }: Props) => {

  const lineItems = map((lineItem) => {
    return (
      <CartItem
        key={lineItem.id}
        lineItem={lineItem}
      />
    );
  }, items);

  return (
    <Drawer isOpen={isOpen} onBackDropClick={() => setCartVisibility(false)}>

      <CartHeader>
        <CartTitle>Cart</CartTitle>
        <CartSubtitle>You have free shipping on this order</CartSubtitle>
      </CartHeader>

      <CartItems>
        {lineItems}
      </CartItems>

      <FormattedMessage id={'Checkout.GoToCheckout'} defaultMessage={'Checkout'}>
        {(checkoutString) => (
          <CheckoutButton as={'a'} href={checkoutUrl} title={checkoutString} target={'_blank'}>{checkoutString}</CheckoutButton>
        )}
      </FormattedMessage>

    </Drawer>
  );
};


CartDrawer.defaultProps = {
  count: 0,
  items: [],
  checkoutUrl: ''
}

const mapStateToProps = ({ cart }) => ({
  isOpen: getOr(false, 'visibility', cart),
  items: getOr([], 'checkout.lineItems', cart),
  checkoutUrl: getOr('', 'checkout.webUrl', cart),
})

export const Cart = connect(mapStateToProps, { setCartVisibility })(CartDrawer)

const CartHeader = styled.header`
  text-align: center;
  padding-bottom: 8px;
`;

const CartTitle = styled(DoublePica)`
  margin-bottom: 2px;
`;

const CartSubtitle = styled(Minion)``;

const CartItems = styled.div`
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-ivory);
  margin-bottom: auto;
`;

const CheckoutSummary = styled.div`
  background-color: rgb(250, 245, 243);
  bottom: 0px;
  position: sticky;
  top: 0px;
  left: 30px;
  right: 30px;
`;

const CheckoutButton = styled(Minion)`
  display: block;
  background-color: var(--color-black);
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1.3;
  letter-spacing: 1.2px;
  border: 1px solid rgb(78, 29, 81);
  padding: 0px 20px;
  transition: all 300ms ease 0s;
  margin: 0px;
  text-decoration: none;
`;
