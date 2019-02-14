/* eslint react/style-prop-object: "off" */
// @flow

import React from 'react';
import styled from 'styled-components';
import { FormattedNumber, injectIntl, intlShape } from 'react-intl';

import { getCurrencyCode } from '../utils/currencies';

type Props = {
  regularPrice: number,
  salePrice?: number,
  className: string,
  intl: intlShape
}

const PriceComponent = ({ regularPrice, salePrice, className, locale, intl }: Props) => {

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
  flex-direction: column;
  align-items: baseline;
`;

const CurrentPrice = styled.span`
  font-size: 24px;
  line-height: 28px;
  color: ${props => props.isSale ? 'var(--color-wine)' : 'var(--color-black)'};
`;

const OldPrice = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-style: italic;
  text-decoration: line-through;
  margin-right: 4px;
`;
