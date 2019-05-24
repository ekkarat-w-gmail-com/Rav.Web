// @flow
import React from 'react';
import styled from 'styled-components';
import { get, map } from 'lodash/fp';
import { Link } from 'gatsby';

// Components
import { Canon } from '../../styling/typography';

// Utils
import { fixedAspectRatio } from '../../styling/mixins';
import { isImage, isVideo } from '../../utils/media';
import { getRouteByType } from '../../utils/routes';

// Types
import type { Block, BlockReference } from '../../types/block';
type Props = {
  block: Block
}

const createMarkup = (html: string) => ({ __html: html });


export const HeroBlock = ({ block }: Props) => {

  const video = isVideo(block.media.file.contentType) ? (
    <VideoContainer>
      <video className="video" loop muted autoPlay playsInline>
        <source src={block.media.file.url} type={block.media.file.contentType} />
      </video>
    </VideoContainer>
    ) : null;

  const htmlContent = createMarkup(block.content.childContentfulRichText.html);

  const references = map((reference: BlockReference) => {
    const slugPrefix = getRouteByType(reference.internal.type);
    const slug = `${slugPrefix}/${reference.slug}`;
    return <HeroButton key={reference.slug} to={slug}>{reference.name}</HeroButton>
  }, block.references)

  return (
    <Hero>
      <Content>
        {block.title && <HeroTitle>{block.title}</HeroTitle>}
        {htmlContent && <HeroBody dangerouslySetInnerHTML={htmlContent} />}
        <HeroActions>{references}</HeroActions>
      </Content>
      {video}
    </Hero>
  );
}

const Hero = styled.div`
  width: 100%;
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  max-width: 600px;
  text-align: center;
  color: var(--color-white);
`;

const HeroTitle = styled(Canon)`

`;

const HeroBody = styled.div`
  margin-top: 1rem;
`;

const HeroActions = styled.div`
  margin-top: 2rem;
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  min-width: 160px;
  width: auto;
  min-height: 50px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  text-decoration: none;
  border: 1px solid var(--color-white);
  transition: background-color 0.25s ease 0s, color 0.25s ease 0s;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    color: var(--color-black);
    background-color: var(--color-white);
  }


`;

const VideoContainer = styled.div`
  ${fixedAspectRatio('16:6')}
`;
