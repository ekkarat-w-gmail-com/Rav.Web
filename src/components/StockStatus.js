// @flow
import React, { memo } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { PicaIndex } from '../styling/typography';
import { PRODUCT_STOCK_IN_STORE, PRODUCT_STOCK_FEW_LEFT, PRODUCT_STOCK_EMPTY } from '../translations/keys';

type Props = {
  quantity: number,
  className?: string
}

export const _StockStatus = ({ quantity, className }: Props) => {

  if ( quantity >= 10 ) {
    return (
      <FormattedMessage id={PRODUCT_STOCK_IN_STORE}>
        {txt => (<StockLabel as={'span'} className={className}>{txt}</StockLabel>)}
      </FormattedMessage>
    );
  } else if ( quantity < 10 && quantity > 0 ) {
    return (
      <FormattedMessage id={PRODUCT_STOCK_FEW_LEFT}>
        {txt => (<StockLabelYellow as={'span'} className={className}>{txt}</StockLabelYellow>)}
      </FormattedMessage>
    );
  } else if ( quantity === 0 ) {
    return (
      <FormattedMessage id={PRODUCT_STOCK_EMPTY}>
        {txt => (<StockLabelRed as={'span'} className={className}>{txt}</StockLabelRed>)}
      </FormattedMessage>
    );
  }

  return null;

}

const StockLabel = styled(PicaIndex)`
  font-style: italic;
  position: relative;
  color: var(--color-black);
  font-family: var(--font-serif);
  background: var(--color-grey);
  border-radius: var(--global-radius);
  padding: 4px 0.5rem 4px 1.5rem;

  &::before {
    content: '';
    display: block;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: var(--color-green);
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

`;

const StockLabelYellow = styled(StockLabel)`
  &::before {
    background: var(--color-mustard);
  }
`

const StockLabelRed = styled(StockLabel)`
  &::before {
    background: var(--color-red);
  }
`

export const StockStatus = memo<Props>(_StockStatus);
StockStatus.displayName = 'StockStatus';
