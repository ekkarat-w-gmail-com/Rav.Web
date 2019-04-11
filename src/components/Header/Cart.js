// @flow
import React, { memo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import { get } from 'lodash/fp';
import { AnimateOnChange } from '@nearform/react-animation'

// Actions
import { getCountInCart } from '../../store/selectors/cart';
import { setCartVisibility } from '../../store/actions';

type Props = {
  count: number,
  isVisible: boolean,
  setCartVisibility: (isVisible: boolean) => void
}

export const _CartComponent = ({ count, setCartVisibility, isVisible }: Props) => (
  <CartIcon onClick={() => setCartVisibility(!isVisible)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
      <path d="M19.122 5.936a1.004 1.004 0 0 0-1.007-.93h-4.088v-1.53c-.16-2.055-1.955-3.6-4.027-3.468C7.928-.124 6.134 1.42 5.973 3.476v1.53H1.885c-.53-.001-.97.405-1.007.93L.002 18.93c-.02.277.078.55.27.753.19.203.458.318.737.317h17.982c.28 0 .547-.114.738-.317a.995.995 0 0 0 .269-.753l-.876-12.994zM6.98 3.476A2.794 2.794 0 0 1 10 1.007a2.794 2.794 0 0 1 3.02 2.47v1.529H6.98v-1.53zM1.01 19l.875-12.995h4.088v2H6.98v-2h6.04v2h1.007v-2h4.088L18.99 19H1.009z" />
    </svg>
    <CartCount>
      <AnimateOnChange animationIn={'bounceIn'} animationOut={'bounceOut'}>
        {count}
      </AnimateOnChange>
    </CartCount>
  </CartIcon>
);

_CartComponent.defaultProps = {
  count: 0,
  isVisible: false
}

const CartComponent = memo<Props>(_CartComponent);

const mapStateToProps = (store) => ({
  count: getCountInCart(store),
  isVisible: get('visibility', store.cart)
})

export const Cart = connect(mapStateToProps, { setCartVisibility })(CartComponent)

const CartIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  cursor: pointer;

  svg {
    fill: var(--color-black);
  }

`;

const CartCount = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 400;
  background: var(--color-mustard);
  color: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: -6px;
  right: -6px;

  > span {
    position: relative;
    top: 1px;
  }

`;
