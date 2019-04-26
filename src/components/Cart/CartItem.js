/* eslint react/style-prop-object: "off" */
// @flow
import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash/fp';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

// Components
import { Price, CurrentPrice, OldPrice } from '../Price';
import { UpArrow, DownArrow } from '../Icons/Arrows';
import { LongPrimer, Brevier } from '../../styling/typography';

import * as i18n from '../../translations/keys';

// Types
import type { CartItem as CartItemType } from '../../types/cart';

type QuantityObject =  {
  id: string,
  quantity: number
}

type Props = {
  lineItem: CartItemType,
  intl: intlShape,
  nonInteractive?: boolean,
  onDecrement?: (QuantityObject) => void,
  onIncrement?: (QuantityObject) => void,
  onRemove?: (id: string) => void
}

const _CartItem = ({ lineItem, intl, nonInteractive, onRemove, onDecrement, onIncrement }: Props) => {

  const id = get('reference', lineItem);
  const quantity = get('quantity', lineItem);

  const removeButton = !nonInteractive ? (
      <RemoveButton onClick={() => onRemove && onRemove( id )}>
        <FormattedMessage id={i18n.CART_ITEM_REMOVE} />
      </RemoveButton>
    ) : null;

  const actions = !nonInteractive ? (
      <ActionsContainer>
        <QuantityButton onClick={() => onIncrement && onIncrement({ id, quantity: quantity + 1 })}>
          <UpArrow />
        </QuantityButton>
        <QuantityWrapper>
          <QuantityText>{lineItem.quantity}</QuantityText>
        </QuantityWrapper>
        <QuantityButton onClick={() => onDecrement && onDecrement({ id, quantity: quantity - 1 })} disabled={lineItem.quantity === 1}>
          <DownArrow />
        </QuantityButton>
      </ActionsContainer>
    ) : null;

  const displayQuantity = nonInteractive ? (
      <FormattedMessage id={i18n.CART_ITEM_QUANTITY} values={{ quantity: lineItem.quantity }}>
        {(quantity) => (<QuantityLabel>{quantity}</QuantityLabel>)}
      </FormattedMessage>
    ) : null;

  return (
    <LineItemWrap>
      <ImageWrap>
        <img src={get('imageUrl', lineItem)} alt={get('name', lineItem)}/>
      </ImageWrap>
      <TextContainer>
        <ProductTitle>{get('name', lineItem)}</ProductTitle>
        <CartItemPrice regularPrice={get('unitPrice', lineItem) * lineItem.quantity} salePrice={get('unitDiscountPrice', lineItem) * lineItem.quantity}/>
        {displayQuantity}
        {removeButton}
      </TextContainer>
      {actions}
    </LineItemWrap>
  );

};

export const CartItem = injectIntl(_CartItem);

const LineItemWrap = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const ImageWrap = styled.div`
  width: 4rem;
  display: block;
  margin-right: 1rem;

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductTitle = styled(LongPrimer)`
  margin-bottom: 2px;
  font-weight: 600;
`;

const CartItemPrice = styled(Price)`
  color: var(--color-black);
  margin-top: 4px;

  span {
    line-height: 1;
  }

  ${CurrentPrice} {
    font-size: 12px;
    margin-right: 4px;
  }

  ${OldPrice} {
    font-size: 12px;
  }

`;

const QuantityLabel = styled.span`
  color: var(--color-black);
  font-size: 12px;
  margin-top: 6px;
`;

const RemoveButton = styled(Brevier)`
  color: var(--color-wine);
  margin-top: auto;
  cursor: pointer;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QuantityButton = styled.button`
  cursor: pointer;
  background: none;
  border: 0 none;
  padding: 0;
  margin: 0;
  line-height: 1;

  &:disabled {
    cursor: auto;
    opacity: 0.2;
  }

  &:focus,
  &:active {
    outline: none;
  }

`;

const QuantityWrapper = styled.div`
  display: block;
  text-align: center;
  transform: translateY(1px);
`;

const QuantityText = styled.span`
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
`;
