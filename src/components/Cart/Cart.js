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
import { StyledButton } from '../../styling/buttons';

// Types
import type { OrderLine } from '../../types/checkout';
type Props = {
  isOpen: boolean,
  items: Array<OrderLine>,
  checkout: Object,
  totalDiscount: string,
  subTotal: string,
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
  subTotal,
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

  const subTotalPrice = Number(subTotal) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(subTotal)} /> : '—';

  const totalTaxPrice = Number(totalTax) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(totalTax)} /> : '—';

  const total = Number(totalPrice) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(totalPrice)} /> : '—';

  const discountNumber= <FormattedNumber style={'currency'} currency={'SEK'} value={Number(totalDiscount)} />

  const discount = Number(totalDiscount) > 0 ? (
    <SummaryItem>
      <FormattedMessage id={'Checkout.Discount'} />
      <SummaryValue>{discountNumber}</SummaryValue>
    </SummaryItem>
  ) : null;


  return (
    <CustomDrawer isOpen={isOpen} onBackDropClick={() => setCartVisibility(false)}>

      <CartHeader>
        <CartTitle>
          <FormattedMessage id={'Checkout.CartTitle'} />
        </CartTitle>
      </CartHeader>

      <CartItems>
        {lineItems}
      </CartItems>

      <CheckoutSummary>

        <SummaryFreeShipping>
          <FormattedMessage id={'Checkout.FreeShipping'} />
        </SummaryFreeShipping>

        <SummaryItems>

          {discount}

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
  totalDiscount: 0,
  subTotal: 0,
  totalTax: 0,
  totalPrice: 0
}

const mapStateToProps = (store) => ({
  isOpen: getOr(false, 'cart.visibility', store),
  items: getOr([], 'cart.data.items', store),
  totalDiscount: getOr(0, 'cart.data.total_discount_amount', store),
  totalPrice: getOr(0, 'cart.data.total_amount', store),
  totalTax: getOr(0, 'cart.data.total_tax_amount', store),
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
