// @flow
import React from 'react';
import { getOr } from 'lodash/fp';
import { connect } from 'react-redux';

// Actions
import { setCartVisibility } from '../store/actions';

// Components
import { Drawer } from './Drawer';
import { Trafalgar } from '../styling/typography';

// Types
type Props = {
  isOpen: boolean,
  items: Array<any> | null,
  setCartVisibility: (bool: boolean) => void
}

export const CartDrawer = ({ isOpen, items, setCartVisibility }: Props) => (
  <Drawer isOpen={isOpen} onBackDropClick={() => setCartVisibility(false)}>
    <Trafalgar>Cart</Trafalgar>
  </Drawer>
);


CartDrawer.defaultProps = {
  count: 0
}

const mapStateToProps = ({ cart }) => ({
  isOpen: getOr(false, 'visibility', cart),
  items: getOr([], 'items', cart)
})

export const Cart = connect(mapStateToProps, { setCartVisibility })(CartDrawer)
