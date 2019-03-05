/* eslint react/style-prop-object: "off" */
// @flow

import React from 'react';
import styled from 'styled-components';
import { FormattedNumber, injectIntl, intlShape } from 'react-intl';

import { getCurrencyCode } from '../utils/currencies';

type Props = {
  regularPrice: number,
  salePrice?: number,
  className?: string,
  intl: intlShape
}

const PriceComponent = ({ regularPrice, salePrice, className, intl }: Props) => {

  const currencyCode = getCurrencyCode(intl.locale);

  if ( salePrice && salePrice > 0 ) {
    return (
      <PriceWrapper className={className}>

        <OldPrice>
          <FormattedNumber style={'currency'} currency={currencyCode} value={regularPrice} />
        </OldPrice>

        <CurrentPrice isSale={true}>
          <FormattedNumber style={'currency'} currency={currencyCode} value={salePrice} />
        </CurrentPrice>

      </PriceWrapper>
    )
  }

  return (
    <PriceWrapper className={className}>
      <CurrentPrice>
        <FormattedNumber style={'currency'} currency={currencyCode} value={regularPrice} />
      </CurrentPrice>
    </PriceWrapper>
  );

};

export const Price = injectIntl(PriceComponent);

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const CurrentPrice = styled.span`
  font-size: 18px;
  line-height: 28px;
  color: ${props => props.isSale ? 'var(--color-wine)' : 'var(--color-black)'};
`;

export const OldPrice = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-style: italic;
  text-decoration: line-through;
  margin-right: 8px;
`;
