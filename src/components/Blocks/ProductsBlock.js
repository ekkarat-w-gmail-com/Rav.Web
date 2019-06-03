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
import { createMarkupFromDocument } from '../../utils/content';

// Types
import type { Block, BlockReferenceProduct } from '../../types/block';
type Props = {
  block: Block
}

export const ProductsBlock = ({ block }: Props) => {

  const htmlContent = block.content && createMarkupFromDocument(block.content.json);

  const cards = map((product: BlockReferenceProduct) => {
    const slugPrefix = getRouteByType(product.internal.type);
    const slug = `${slugPrefix}/${product.slug}`;
    return (
      <ProductReference
        key={product.id}
        to={slug}
        thumbnail={product.featuredImage.fixed.src}
        title={product.name}
        excerpt={product.shortDescription.shortDescription} />
    )
  }, block.references);

  return (
    <Container>
      <Content>
        {block.label && <Label as={'h3'}>{block.label}</Label>}
        {block.title && <Title>{block.title}</Title>}
        {htmlContent && <Body>{htmlContent}</Body>}
      </Content>
      <ProductCards>
        {cards}
      </ProductCards>
    </Container>
  );
}

const Container = styled(GridWrap)`
  position: relative;
  background: var(--color-ivory);
  padding-top: 80px;
  padding-bottom: 80px;
  align-items: center;
`;

const Content = styled.div`
  color: var(--color-black);
  grid-column: col-two / span 3;
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
