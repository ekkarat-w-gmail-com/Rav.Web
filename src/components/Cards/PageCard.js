// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

// Components
import { PicaIndex, GreatPrimer, LongPrimer } from '../../styling/typography';
import { fixedAspectRatio } from '../../styling/mixins';

// Types
type Props = {
  imageUrl: string,
  label?: string,
  title: string,
  content: string,
  url: string
}

export const PageCard = ({ imageUrl, label, title, content, url }: Props) => {
  return (
    <StyledPageCard to={url}>
      <ImageContainer>
        <Image src={imageUrl} />
      </ImageContainer>
      <ContentContainer>
        {label && <Label>{label}</Label>}
        <Title as={'h3'}>{title}</Title>
        <Excerpt>{content}</Excerpt>
      </ContentContainer>
    </StyledPageCard>
  )
};

const StyledPageCard = styled(Link)`
  text-align: center;
  color: var(--color-black);
  text-decoration: none;
`;

const ImageContainer = styled.div`
  ${fixedAspectRatio('256:171')}
  overflow: hidden;
`;

const Image = styled.img`
  transition: transform 0.6s ease-out 0s;

  &:hover {
    transform: scale(1.08);
  }
`;

const ContentContainer = styled.div`
  padding: 14px 1rem 1rem 1rem;
`;

const Label = styled(PicaIndex)`
  font-family: var(--font-serif);
  font-style: italic;
  margin-bottom: 8px;
`;

const Title = styled(GreatPrimer)`
  margin-bottom: 6px;
`;

const Excerpt = styled.p`
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
`;
