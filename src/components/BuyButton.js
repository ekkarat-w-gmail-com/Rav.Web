// @flow
import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Utils
import * as translation from '../translations/keys';

type Props = {
  outOfStock: boolean,
  className?: string,
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void
}

export const BuyButton = ({ outOfStock, className, onClick }: Props) => {

  const [ isAnimating, setAnimating ] = useState(false);

  let timeoutID = null;

  useEffect(() => {
    () => timeoutID && clearTimeout(timeoutID)
  })

  const handleOnClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    if ( !isAnimating ) {

      // Animate if not already animating
      setAnimating(true);

      // Call onClick prop function
      onClick(event);

      // Reset
      timeoutID = setTimeout(() => {
        setAnimating(false);
      }, 800);

    }
  }

  const text = outOfStock ? <FormattedMessage id={translation.BUY_BUTTON_OUT_OF_STOCK} /> : <FormattedMessage id={translation.BUY_BUTTON_SELECT} />;

  return (
    <Button className={className} disabled={outOfStock} onClick={handleOnClick} isAdded={isAnimating}>
      {text}
      <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
        <path strokeDasharray="19.79 19.79" strokeDashoffset="19.79" fill="none" stroke={!outOfStock ? '#FFFFFF' : '#000000'} strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11" />
      </svg>
    </Button>
  )

}

const isAddedMixin = () => css`

  span {
		color: transparent;
		transform: translateY(-100%);
		transition: transform 0s;
  }

  svg {
    transform: translateX(-50%) translateY(-50%);
		transition: transform 0s;
  }

  svg path {
    animation: ${FillCheckmark} 300ms linear forwards;
  }

`;

const Button = styled.button`
  position: relative;
	overflow: hidden;
  background-color: #000;
  color: #fff;
  width: 100%;
  height: 3rem;
  border: 0 none;
  border-radius: var(--global-radius);
  margin-top: 2rem;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:disabled {
    color: #000;
    cursor: auto;
    background-color: var(--color-ivory);
  }

  span {
    font-size: 14px;
    line-height: 3rem;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: translateZ(0);
		backface-visibility: hidden;
		transition: transform 0.3s;
    background: transparent;
	}

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translateX(50%) translateY(-50%);
    transition: transform 0.3s;
	}

  svg path {
    dashoffset: 19.79;
  }

  ${props => props.isAdded && isAddedMixin}

`;

const FillCheckmark = keyframes`

  to {
    stroke-dashoffset: 0;
  }

`;
