// @flow
import React from 'react';
import styled from 'styled-components';

export const Cart = () => (
  <CartIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
    <path d="M19.122 5.936a1.004 1.004 0 0 0-1.007-.93h-4.088v-1.53c-.16-2.055-1.955-3.6-4.027-3.468C7.928-.124 6.134 1.42 5.973 3.476v1.53H1.885c-.53-.001-.97.405-1.007.93L.002 18.93c-.02.277.078.55.27.753.19.203.458.318.737.317h17.982c.28 0 .547-.114.738-.317a.995.995 0 0 0 .269-.753l-.876-12.994zM6.98 3.476A2.794 2.794 0 0 1 10 1.007a2.794 2.794 0 0 1 3.02 2.47v1.529H6.98v-1.53zM1.01 19l.875-12.995h4.088v2H6.98v-2h6.04v2h1.007v-2h4.088L18.99 19H1.009z" />
  </CartIcon>
)

const CartIcon = styled.svg`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  fill: var(--color-black);
`;
