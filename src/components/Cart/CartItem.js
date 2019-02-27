/* eslint react/style-prop-object: "off" */
// @flow
import React from 'react';
import styled from 'styled-components';
import { get, has } from 'lodash/fp';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import { AnimateOnChange } from '@nearform/react-animation';

// Components
import { UpArrow, DownArrow } from '../Icons/Arrows';
import { LongPrimer, Brevier } from '../../styling/typography';

// Types
type LineItem = {
  id: string,
  title: string,
  quantity: string,
  variant: {
    id: string,
    title: string,
    price: string,
    image: {
      id: string,
      src: string,
      altText: string,
    }
  }
}

type QuantityObject =  {
  id: string,
  quantity: number
}

type Props = {
  lineItem: LineItem,
  onDecrement: (QuantityObject) => void,
  onIncrement: (QuantityObject) => void,
  onRemove: (id: string) => void
}

export const CartItem = ({ lineItem, onRemove, onDecrement, onIncrement }: Props) => {

  const variantTitle = get('variant.title', lineItem) !== 'Default Title' ?
    <VariantTitle>{get('variant.title', lineItem)}</VariantTitle> : null;

  const id = get('variant.id', lineItem);
  const quantity = get('quantity', lineItem);

  return (
    <LineItemWrap>
      <ImageWrap>
        {has('variant.image', lineItem) ? <img src={lineItem.variant.image.src} alt={`${lineItem.title}`}/> : null}
      </ImageWrap>
      <TextContainer>
        <ProductTitle>{get('title', lineItem)}</ProductTitle>
        {variantTitle}
        <VariantPrice>
          <FormattedNumber style={'currency'} currency={'SEK'} value={get('variant.price', lineItem)} />
        </VariantPrice>
        <RemoveButton onClick={() => onRemove( get('id', lineItem) )}>
          <FormattedMessage id={'CartItem.Remove'} />
        </RemoveButton>
      </TextContainer>
      <ActionsContainer>
        <QuantityButton onClick={() => onIncrement({ id, quantity: quantity + 1 })}>
          <UpArrow />
        </QuantityButton>
        <QuantityWrapper>
          <AnimateOnChange animationOut={'bounceOut'} animationIn={'bounceIn'}>
            <QuantityText>{lineItem.quantity}</QuantityText>
          </AnimateOnChange>
        </QuantityWrapper>
        <QuantityButton onClick={() => onDecrement({ id, quantity: quantity - 1 })} disabled={lineItem.quantity === 1}>
          <DownArrow />
        </QuantityButton>
      </ActionsContainer>
    </LineItemWrap>
  );

};

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

const VariantTitle = styled(Brevier)`
  color: var(--color-wine);
`;

const VariantPrice = styled(Brevier)`
  color: var(--color-black);
  margin-top: 2px;
`;

const RemoveButton = styled(Brevier)`
  color: var(--color-wine);
  margin-top: auto;
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
