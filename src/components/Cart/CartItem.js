/* eslint react/style-prop-object: "off" */
// @flow
import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash/fp';
import { FormattedNumber, FormattedMessage, injectIntl, intlShape } from 'react-intl';

// Components
import { UpArrow, DownArrow } from '../Icons/Arrows';
import { LongPrimer, Brevier } from '../../styling/typography';

// Utils
import { getCurrencyCode } from '../../utils/currencies';

// Types
import type { OrderLine } from '../../types/checkout';

type QuantityObject =  {
  id: string,
  quantity: number
}

type Props = {
  lineItem: OrderLine,
  intl: intlShape,
  onDecrement: (QuantityObject) => void,
  onIncrement: (QuantityObject) => void,
  onRemove: (id: string) => void
}

const _CartItem = ({ lineItem, intl, onRemove, onDecrement, onIncrement }: Props) => {

  const id = get('reference', lineItem);
  const quantity = get('quantity', lineItem);

  const currencyCode = getCurrencyCode(intl.locale);

  return (
    <LineItemWrap>
      <ImageWrap>
        <img src={get('image_url', lineItem)} alt={get('name', lineItem)}/>
      </ImageWrap>
      <TextContainer>
        <ProductTitle>{get('name', lineItem)}</ProductTitle>
        <VariantPrice>
          <FormattedNumber style={'currency'} currency={currencyCode} value={get('unit_price', lineItem)} />
        </VariantPrice>
        <RemoveButton onClick={() => onRemove( id )}>
          <FormattedMessage id={'CartItem.Remove'} />
        </RemoveButton>
      </TextContainer>
      <ActionsContainer>
        <QuantityButton onClick={() => onIncrement({ id, quantity: quantity + 1 })}>
          <UpArrow />
        </QuantityButton>
        <QuantityWrapper>
          <QuantityText>{lineItem.quantity}</QuantityText>
        </QuantityWrapper>
        <QuantityButton onClick={() => onDecrement({ id, quantity: quantity - 1 })} disabled={lineItem.quantity === 1}>
          <DownArrow />
        </QuantityButton>
      </ActionsContainer>
    </LineItemWrap>
  );

};

export const CartItem = injectIntl(_CartItem);

const LineItemWrap = styled.div`
  display: flex;
  margin-bottom: 14px;
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

const VariantPrice = styled(Brevier)`
  color: var(--color-black);
  margin-top: 2px;
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
