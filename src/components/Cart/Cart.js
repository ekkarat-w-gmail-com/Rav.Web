/* eslint react/style-prop-object: "off" */
// @flow
import React from 'react';
import { Link } from 'gatsby';
import { get, getOr, map } from 'lodash/fp';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import styled from 'styled-components';

// Actions
import { setCartVisibility, updateItemQuantity, removeItemFromCart } from '../../store/actions';

// Components
import { CartItem } from './CartItem'
import { Drawer } from '../Drawer';
import { DoublePica, Minion } from '../../styling/typography';

// Types
type Props = {
  isOpen: boolean,
  items: Array<any>,
  checkout: Object,
  subTotal: string,
  totalTax: string,
  totalPrice: string,
  setCartVisibility: (bool: boolean) => void,
  updateItemQuantity: (checkout: any) => void,
  removeItemFromCart: (checkout: any) => void
}

export const CartDrawer = ({
  isOpen,
  items,
  checkout,
  subTotal,
  totalTax,
  totalPrice,
  setCartVisibility,
  updateItemQuantity,
  removeItemFromCart
  }: Props) => {

  const handleOnQuantityChange = ({ id, quantity }) => {
    console.log('handleOnQuantityChange -->', id, quantity)
  }

  const handleOnRemove = (id) => {
    console.log('handleOnRemove -->', id)
  }

  const lineItems = map((lineItem) => {
    return (
      <CartItem
        key={lineItem.id}
        lineItem={lineItem}
        onIncrement={handleOnQuantityChange}
        onDecrement={handleOnQuantityChange}
        onRemove={handleOnRemove}
      />
    );
  }, items);

  const subTotalPrice = Number(subTotal) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(subTotal)} /> : '—';

  const totalTaxPrice = Number(totalTax) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(totalTax)} /> : '—';

  const total = Number(totalPrice) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(totalPrice)} /> : '—';


  return (
    <CustomDrawer isOpen={isOpen} onBackDropClick={() => setCartVisibility(false)}>

      <CartHeader>
        <CartTitle>
          <FormattedMessage id={'Checkout.CartTitle'} />
        </CartTitle>
        <CartSubtitle>
          <FormattedMessage id={'Checkout.FreeShipping'} />
        </CartSubtitle>
      </CartHeader>

      <CartItems>
        {lineItems}
      </CartItems>

      <CheckoutSummary>
        <SummaryItems>
          <SummaryItem>
            <FormattedMessage id={'Checkout.Subtotal'} />
            <SummaryValue>{subTotalPrice}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <FormattedMessage id={'Checkout.Tax'} />
            <SummaryValue>{totalTaxPrice}</SummaryValue>
          </SummaryItem>
        </SummaryItems>
        <TotalItem>
          <FormattedMessage id={'Checkout.Total'} />
          <SummaryValue>{total}</SummaryValue>
        </TotalItem>
        <FormattedMessage id={'Checkout.GoToCheckout'} defaultMessage={'Checkout'}>
          {(checkoutString) => (
            <CheckoutButton>
            <Link to={'/checkout'} onClick={() => setCartVisibility(false)}>
                {checkoutString}
            </Link>
            </CheckoutButton>
          )}
        </FormattedMessage>
        <KeepShoppingButton onClick={() => setCartVisibility(false)}>
          <FormattedMessage id={'Checkout.KeepShopping'} />
        </KeepShoppingButton>
      </CheckoutSummary>

    </CustomDrawer>
  );
};


CartDrawer.defaultProps = {
  count: 0,
  items: [],
  checkoutUrl: '',
  subTotal: '0',
  totalTax: '0',
  totalPrice: '0'
}

const mapStateToProps = ({ cart }) => ({
  isOpen: getOr(false, 'visibility', cart),
  items: getOr([], 'checkout.lineItems', cart),
  subTotal: get('checkout.subtotalPrice', cart),
  totalTax: get('checkout.totalTax', cart),
  totalPrice: get('checkout.totalPrice', cart),
  checkout: get('checkout', cart)
})

export const Cart = connect(mapStateToProps, { setCartVisibility, updateItemQuantity, removeItemFromCart })(CartDrawer)

const CustomDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
`;

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
  bottom: 0px;
  position: sticky;
  top: 0px;
  left: 30px;
  right: 30px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.92;

  @media (min-width: 1350px) {
    position: relative;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 0px;
  }

`;

const SummaryItems = styled.div`
  margin-bottom: 4px;
`;

const SummaryItem = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const SummaryValue = styled.span`
  margin-left: auto;
`;

const TotalItem = styled.div`
  display: flex;
  padding-top: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin-bottom: 10px;
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

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const KeepShoppingButton = styled(Minion)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  color: var(--color-wine);
  text-decoration: underline;
  cursor: pointer;
`;
