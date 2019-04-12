/* eslint react/style-prop-object: "off" */
// @flow
import React from 'react';
import { navigate } from 'gatsby';
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
import { StyledButton } from '../../styling/buttons';

// i18n
import * as i18n from '../../translations/keys';

// Types
import type { OrderLine } from '../../types/checkout';
type Props = {
  isOpen: boolean,
  items: Array<OrderLine>,
  checkout: Object,
  totalDiscount: string,
  totalTax: string,
  totalPrice: string,
  setCartVisibility: (bool: boolean) => void,
  updateItemQuantity: (id: string, quantity: number) => void,
  removeItemFromCart: (id: string) => void
}

export const CartDrawer = ({
  isOpen,
  items,
  checkout,
  totalDiscount,
  totalTax,
  totalPrice,
  setCartVisibility,
  updateItemQuantity,
  removeItemFromCart
  }: Props) => {

  const handleOnQuantityChange = ({ id, quantity }) => {
    updateItemQuantity(id, quantity);
  }

  const handleOnRemove = (id) => {
    removeItemFromCart(id);
  }

  const onCheckoutClick = () => {
    setCartVisibility(false);
    navigate('/checkout');
  }

  const lineItems = map((lineItem) => {
    return (
      <CartItem
        key={get('reference', lineItem)}
        lineItem={lineItem}
        onIncrement={handleOnQuantityChange}
        onDecrement={handleOnQuantityChange}
        onRemove={handleOnRemove}
      />
    );
  }, items);

  const totalTaxPrice = Number(totalTax) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(totalTax)} /> : '—';

  const total = Number(totalPrice) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(totalPrice)} /> : '—';

  const discountNumber= <FormattedNumber style={'currency'} currency={'SEK'} value={Number(totalDiscount)} />

  const discount = Number(totalDiscount) > 0 ? (
    <SummaryItem>
      <FormattedMessage id={i18n.CART_DISCOUNT} />
      <SummaryValue>{discountNumber}</SummaryValue>
    </SummaryItem>
  ) : null;


  return (
    <CustomDrawer isOpen={isOpen} onBackDropClick={() => setCartVisibility(false)}>

      <CartHeader>
        <CartTitle>
          <FormattedMessage id={i18n.CART_CART_TITLE} />
        </CartTitle>
      </CartHeader>

      <CartItems>
        {lineItems}
      </CartItems>

      <CheckoutSummary>

        <SummaryItems>

          {discount}

          <SummaryItem>
            <FormattedMessage id={i18n.CART_TAX} />
            <SummaryValue>{totalTaxPrice}</SummaryValue>
          </SummaryItem>
        </SummaryItems>
        <TotalItem>
          <FormattedMessage id={i18n.CART_TOTAL} />
          <SummaryValue>{total}</SummaryValue>
        </TotalItem>
        <FormattedMessage id={i18n.CART_GO_TO_CHECKOUT} defaultMessage={'Checkout'}>
          {(checkoutString) => (
            <CheckoutButton onClick={onCheckoutClick}>{checkoutString}</CheckoutButton>
          )}
        </FormattedMessage>
        <KeepShoppingButton onClick={() => setCartVisibility(false)}>
          <FormattedMessage id={i18n.CART_KEEP_SHOPPING} />
        </KeepShoppingButton>
      </CheckoutSummary>

    </CustomDrawer>
  );
};


CartDrawer.defaultProps = {
  count: 0,
  items: [],
  checkoutUrl: '',
  totalDiscount: 0,
  totalTax: 0,
  totalPrice: 0
}

const mapStateToProps = (store) => ({
  isOpen: getOr(false, 'cart.visibility', store),
  items: getOr([], 'cart.data.items', store),
  totalDiscount: getOr(0, 'cart.data.totalDiscountAmount', store),
  totalPrice: getOr(0, 'cart.data.totalAmount', store),
  totalTax: getOr(0, 'cart.data.totalTaxAmount', store),
})

export const Cart = connect(mapStateToProps, { setCartVisibility, updateItemQuantity, removeItemFromCart })(CartDrawer)

const CustomDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const CartHeader = styled.header`
  text-align: left;
  padding: 2rem;
`;

const CartTitle = styled(DoublePica)`
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 1px;
    width: 3rem;
    background: var(--color-black);
    position: absolute;
    bottom: -1rem;
    left: 0;
  }
`;

const CartItems = styled.div`
  margin-top: 0.5rem;
  margin-bottom: auto;
  padding: 1rem 2rem;
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
  padding: 1.5rem 2rem 2rem;
  background: var(--color-ivory);

  @media (min-width: 1350px) {
    position: relative;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 0px;
  }

`;

const SummaryFreeShipping = styled.div`
  text-align: center;
  margin-bottom: 1rem;
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
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1rem;
`;

const CheckoutButton = styled(StyledButton)`
  display: block;
  background-color: var(--color-black);
  color: #fff;
  cursor: pointer;
  margin: 0;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const KeepShoppingButton = styled(Minion)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  color: var(--color-black);
  text-decoration: underline;
  cursor: pointer;
`;
