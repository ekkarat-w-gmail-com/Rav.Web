// @flow
import React from 'react';
import styled from 'styled-components';
import { get, map } from 'lodash/fp';
import { Link } from 'gatsby';

// Components
import { Trafalgar, PicaIndex } from '../../styling/typography';
import { GridWrap } from '../../styling/grid';
import { PageCard } from '../Cards';

// Utils
import { fixedAspectRatio } from '../../styling/mixins';
import { isImage, isVideo } from '../../utils/media';
import { getRouteByType } from '../../utils/routes';

// Types
import type { Block, BlockReferenceProduct } from '../../types/block';

type Props = {
  block: Block
}

export const PagesBlock = ({ block }: Props) => {

  const references = map((page) => {
    const slugPrefix = getRouteByType(page.internal.type);
    const slug = `${slugPrefix}/${page.slug}`;

    return (
      <PageCard
        key={slug}
        imageUrl={get('featuredMedia.fixed.src', page)}
        title={page.title}
        label={page.label}
        content={page.excerpt.excerpt}
        url={slug} />
    )
  }, block.references);

  return (
    <Container>
      <Content>
        {block.label && <Label as={'h3'}>{block.label}</Label>}
        {block.title && <Title>{block.title}</Title>}
      </Content>
      <PageCards>
        {references}
      </PageCards>
    </Container>
  );
}

const Container = styled(GridWrap)`
  position: relative;
  margin-top: 80px;
  margin-bottom: 80px;
  align-items: center;
  grid-template-rows: auto 1fr;
`;

const Content = styled.div`
  color: var(--color-black);
  grid-column: col-one / span 6;
  grid-row: 1;
  text-align: left;
`;

const Label = styled(PicaIndex)`
  font-family: var(--font-serif);
  font-style: italic;
  margin: 0 0 1rem;
`;

const Title = styled(Trafalgar)`
  margin-bottom: 4rem;

  &::after {
    content: '';
    display: block;
    height: 1px;
    width: 120px;
    background-color: black;
    margin: 18px 0px 10px;
  }

`;

const PageCards = styled.div`
  display: grid;
  grid-column: col-one / col-twelve;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
`;

const PageReference = styled(PageCard)`

`;
