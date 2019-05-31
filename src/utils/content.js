// @flow
import React from 'react';
import { get, merge } from 'lodash/fp';
import styled from 'styled-components';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Styles
import { BodyCopy, Paragon, Trafalgar, DoublePica } from '../styling/typography';

// Custom Styles
const CustomH1 = styled(Trafalgar)``;
const CustomH2 = styled(Paragon)``;
const CustomH3 = styled(DoublePica)`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const Paragraph = styled(BodyCopy)`
  display: block;
  font-family: var(--font-serif);
  margin-bottom: 2rem;
`;

const Qoute = styled.q`
  display: block;
  font-family: var(--font-serif);
  font-size: 36px;
  line-height: 48px;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const CustomImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

// Custom components
const Image = ({ node }) => {
  const url = get('data.target.fields.file[sv].url', node);
  const alt = get('data.target.fields.title[sv]', node);
  return <CustomImage src={url} alt={alt} />
};

const CustomQoute = ({ children }) => {
  return React.Children.map(children, (child) => (
    <Qoute>{child.props.children}</Qoute>
  ));
}

const DEFAULT_OPTIONS = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <CustomH1 as={'h1'}>{children}</CustomH1>,
    [BLOCKS.HEADING_2]: (node, children) => <CustomH2 as={'h2'}>{children}</CustomH2>,
    [BLOCKS.HEADING_3]: (node, children) => <CustomH3 as={'h3'}>{children}</CustomH3>,
    [BLOCKS.QUOTE]: (node, children) => <CustomQoute>{children}</CustomQoute>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => <Image node={node} />
  }
};

export const createMarkupFromDocument = (json: string, options: Object) => {
  const config = merge(DEFAULT_OPTIONS, options);
  return documentToReactComponents(json, config);
};
