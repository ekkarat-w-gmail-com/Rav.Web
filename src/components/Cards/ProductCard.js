// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

type Props = {
  title: string,
  excerpt: string,
  thumbnail: string,
  to: string
}

export const ProductCard = ({ title, excerpt, thumbnail, to }: Props) => (
  <ProductCardWrapper to={to}>
    <ImageWrapper>
      <img src={thumbnail} alt={title} />
    </ImageWrapper>
    <Title>{title}</Title>
    <Excerpt>{excerpt}</Excerpt>
  </ProductCardWrapper>
)

const ProductCardWrapper = styled(Link)`
  background: #fff;
  color: var(--color-black);
  text-decoration: none;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 0px;
  padding-top: 150%;
  position: relative;
  cursor: pointer;
  background-color: rgb(245, 244, 240);
  font-size: 0px;
  overflow: hidden;

  img {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }

`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  display: block;
  margin: 16px 10px 12px;
  color: var(--color-black);
`;

const Excerpt = styled.p`
  font-family: var(--font-serif);
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  line-height: 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
  margin: 0px auto 7px;
`;
