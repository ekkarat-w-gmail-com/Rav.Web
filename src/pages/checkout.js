// @flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { has, get, map, getOr } from 'lodash/fp';
import { FormattedMessage, FormattedNumber } from 'react-intl';

// Components
import Layout from '../components/layout';
import { Text, RadioBox } from '../components/Fields';
import { Minion, PicaIndex } from '../styling/typography';
import { PostNord, Klarna } from '../components/Icons/Brands';
import { KlarnaCheckout } from '../components/KlarnaCheckout';
import { GridWrap } from '../styling/grid';

// Actions
import { createKlarnaCheckout } from '../store/actions';

// Utils
import { formatKlarnaOrder } from '../utils/checkout';

// i18n
import * as i18n from '../translations/keys';

// Type
import type { Cart, CartItem } from '../types/cart';
type Props = {
  checkout: { [key: string]: any },
  cart: Cart,
  createKlarnaCheckout: (klarnaOrder: Object) => void
}

const CheckoutComponent = (props: Props) => {

  const [ form, setValues ] = useState({
    emailAddress: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    zip: '',
    phone: '',
    deliveryOption: 'postNord',
    paymentOption: '',
  });

  const handleOnInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...form, [name]: value });
  }

  const handleOnShippingSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const cartItems = get('cart.data.items', props);

  useEffect(() => {
    if ( form.paymentOption === 'klarna')  {
      const orderAmount = getOr(0, 'cart.data.totalAmount', props);
      const taxAmount = getOr(0, 'cart.data.totalTaxAmount', props);
      const order = formatKlarnaOrder(form, cartItems, orderAmount, taxAmount);
      props.createKlarnaCheckout(order);
    }
  }, [ form.paymentOption ])

  const totalDiscount = getOr(0, 'cart.data.totalDiscountAmount', props);
  const totalPrice = getOr(0, 'cart.data.totalAmount', props);
  const totalTax = getOr(0, 'cart.data.totalTaxAmount', props);

  const subTotalPrice = Number(0) > 0 ?
    <FormattedNumber style={'currency'} currency={'SEK'} value={Number(0)} /> : '—';

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

  const showKlarnaCheckout = has('html_snippet', props.checkout) && get('status', props.checkout) === 'checkout_incomplete';

  return (
    <Layout useCheckoutLayout={true}>
      <GridWrap>
        <Panels>
          <Panel>
            <PanelInner onSubmit={handleOnShippingSubmit}>
              <PanelHeader>
                <FormattedMessage id={i18n.CHECKOUT_SHIPPING_AND_BILLING}>
                  {(txt) => (<PanelTitle>{txt}</PanelTitle>)}
                </FormattedMessage>
              </PanelHeader>
              <Text label={'Email Address'} id={'emailAddress'} name={'emailAddress'} autocomplete={'email'} value={form.emailAddress} onChange={handleOnInputChange} />
              <FormattedMessage id={i18n.CHECKOUT_SHIPPING_ADDRESS}>
                {(txt) => (<LegendTitle>{txt}</LegendTitle>)}
              </FormattedMessage>
              <FieldGroup>
                <Text label={'First Name'} id={'firstName'} name={'firstName'} autocomplete={'first-name given-name'} value={form.firstName} onChange={handleOnInputChange} />
                <Text label={'Last Name'} id={'lastName'} name={'lastName'} autocomplete={'last-name family-name'} value={form.lastName} onChange={handleOnInputChange} />
              </FieldGroup>
              <Text label={'Phone'} id={'phone'} name={'phone'} autocomplete={'shipping phone'} value={form.phone} onChange={handleOnInputChange} />
              <Text label={'Street Address'} id={'streetAddress'} name={'streetAddress'} autocomplete={'shipping address-line1'} value={form.streetAddress} onChange={handleOnInputChange} />
              <FieldGroup>
                <Text label={'City'} id={'city'} name={'city'} autocomplete={'shipping city'} value={form.city} onChange={handleOnInputChange} />
                <Text label={'Zip'} id={'zip'} name={'zip'} autocomplete={'shipping zip'} value={form.zip} onChange={handleOnInputChange} />
              </FieldGroup>
            </PanelInner>
          </Panel>
          <Panel>
            <PanelInner onSubmit={handleOnShippingSubmit}>
              <PanelHeader>
                <FormattedMessage id={i18n.CHECKOUT_DELIVERY_AND_PAYMENT}>
                  {(txt) => (<PanelTitle>{txt}</PanelTitle>)}
                </FormattedMessage>
              </PanelHeader>

              <LegendTitle>{'Delivery Options'}</LegendTitle>
              <RadioBox label={'PostNord'} description={'1-2 weekdays'} icon={<PostNord />} id={'postNord'} name={'deliveryOption'} value={'postNord'} checked={form.deliveryOption === 'postNord'} onChange={handleOnInputChange} note={'Free'} />
              <RadioBox label={'PostNord - Hemleverans'} description={'4-7 weekdays'} icon={<PostNord />} id={'postNordHomeDelivery'} name={'deliveryOption'} value={'postNordHomeDelivery'} checked={form.deliveryOption === 'postNordHomeDelivery'} onChange={handleOnInputChange} note={'100kr'}/>

              <LegendTitle>{'Payment Options'}</LegendTitle>
              <RadioBox label={'Klarna'} description={'Betala med kontokort, direkt från banken eller dela upp betalning'} icon={<Klarna />} id={'klarna'} name={'paymentOption'} value={'klarna'} checked={form.paymentOption === 'klarna'} onChange={handleOnInputChange} />

              {showKlarnaCheckout && <KlarnaCheckout key={get('order_id', props.checkout)} html={get('html_snippet', props.checkout)} />}
            </PanelInner>
          </Panel>
        </Panels>

        <OverviewColumn>
          <OverviewColumnInner>

            <PanelHeader>
              <FormattedMessage id={i18n.CHECKOUT_REVIEW_ORDER}>
                {(txt) => (<PanelTitle>{txt}</PanelTitle>)}
              </FormattedMessage>
            </PanelHeader>


            <CartItems>
              {cartItems && map((item: CartItem) => (
                <li key={item.reference}>{item.quantity} x {item.name}</li>
              ), cartItems)}
            </CartItems>

            <CheckoutSummary>
              <SummaryItems>
                {discount}
                <SummaryItem>
                  <FormattedMessage id={i18n.CART_SUBTOTAL} />
                  <SummaryValue>{subTotalPrice}</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <FormattedMessage id={i18n.CART_TAX} />
                  <SummaryValue>{totalTaxPrice}</SummaryValue>
                </SummaryItem>
              </SummaryItems>
              <TotalItem>
                <FormattedMessage id={i18n.CART_TOTAL} />
                <SummaryValue>{total}</SummaryValue>
              </TotalItem>
            </CheckoutSummary>

          </OverviewColumnInner>
        </OverviewColumn>

      </GridWrap>
    </Layout>
  )
}

const mapStateToProps = ({ checkout, cart }) => ({
  checkout: checkout,
  cart: cart
});

export default connect(mapStateToProps, { createKlarnaCheckout })(CheckoutComponent)

const Panels = styled.div`
  grid-column: left / col-eight;
  background-color: var(--color-grey);
  padding-bottom: 12rem;
`;

const Panel = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-darkGrey);
  }
`;

const PanelInner = styled.form`
  min-height: 100%;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  flex-grow: 1;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

const PanelTitle = styled(PicaIndex)`
  color: var(--color-black);
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 3rem;
    height: 1px;
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-black);
  }

`;

const OverviewColumn = styled.div`
  grid-column-start: col-ten;
  grid-column-end: right;
`;

const OverviewColumnInner = styled.div`
  position: sticky;
  top: 60px;
`;

const CartItems = styled.div`
  margin-bottom: 2rem;
`;

const CheckoutSummary = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
`;

const SummaryItems = styled.div`
  margin-bottom: 2px;
`;

const SummaryItem = styled.div`
  display: flex;
  margin-bottom: 0;
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

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 0;
`;

const LegendTitle = styled(Minion)`
  display: block;
  font-weight: 600;
  margin-bottom: 0.875rem;
  margin-top: 1.5rem;
`;
