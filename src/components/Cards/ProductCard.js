// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string,
  to: string
}

export const ProductCard = ({ title }: Props) => (
  <ProductCardWrapper>
    <Title>{title}</Title>
  </ProductCardWrapper>
)

const ProductCardWrapper = styled.div`
  background: var(--color-ivory);
`;

const Title = styled.span`
  font-size: 1.5rem;
  color: #fff;
`;
