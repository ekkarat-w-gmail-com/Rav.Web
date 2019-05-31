// @flow
import React from 'react';
import styled from 'styled-components';
import { get, map } from 'lodash/fp';
import { Link } from 'gatsby';

// Components
import { Trafalgar, PicaIndex } from '../../styling/typography';
import { GridWrap } from '../../styling/grid';
import { ProductCard } from '../Cards/ProductCard';

// Utils
import { fixedAspectRatio } from '../../styling/mixins';
import { isImage, isVideo } from '../../utils/media';
import { getRouteByType } from '../../utils/routes';

// Types
import type { Block, BlockReferenceProduct } from '../../types/block';

type Props = {
  block: Block
}

const createMarkup = (html: string) => ({ __html: html });

export const PagesBlock = ({ block }: Props) => {

  return (
    <Container>
      <Content>
        {block.label && <Label as={'h3'}>{block.label}</Label>}
        {block.title && <Title>{block.title}</Title>}
      </Content>
    </Container>
  );
}

const Container = styled(GridWrap)`
  position: relative;
  padding-top: 80px;
  padding-bottom: 80px;
  align-items: center;
  grid-template-rows: repeat(2, 1fr);
`;

const Content = styled.div`
  color: var(--color-black);
  grid-column: col-four / span 6;
  grid-row: 1;
  text-align: center;
`;

const Label = styled(PicaIndex)`
  font-family: var(--font-serif);
  font-style: italic;
  margin: 0 0 1rem;
`;

const Title = styled(Trafalgar)`
  margin-bottom: 1rem;
`;

const Body = styled.div`
  margin-top: 1rem;

  p {
    font-family: var(--font-serif);
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    line-height: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

`;

const ProductCards = styled.div`
  display: grid;
  grid-column: col-six / right;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1rem;
`;

const ProductReference = styled(ProductCard)`
  background: transparent;
  margin-bottom: 0;
  p {
    margin-bottom: 0;
  }
`;
