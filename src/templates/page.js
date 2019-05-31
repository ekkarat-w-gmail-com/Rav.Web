// @flow
import React from 'react'
import { get } from 'lodash/fp';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby';
import styled from 'styled-components';

// Utils
import { createMarkupFromDocument } from '../utils/content';

// Components
import Layout from '../components/layout'
import { HeroBlock } from '../components/Blocks/HeroBlock';

// Styling
import { GridWrap } from '../styling/grid';
import { Canon, BodyCopy, Trafalgar, GreatPrimer, BodyContent } from '../styling/typography';

// Types
type Props = {
  intl: intlShape,
  data: {
    page: any
  },
  pageContext: {
    slug: string
  }
}

const PageTemplate = ({ data, intl }: Props) => {
  const { page } = data;
  const heroBlock = {
    title: get('title', page),
    type: 'Hero',
    media: {
      file: {
        contentType: get('featuredMedia.file.contentType', page),
        url: get('featuredMedia.file.url', page)
      }
    }
  };

  const content = createMarkupFromDocument(get('body.json', page));

  return (
    <Layout>
      <GridWrap>
        <StyledHeroBlock block={heroBlock} />
        <StyledBodyContent>
          {content}
        </StyledBodyContent>
      </GridWrap>
    </Layout>
  )
}


export default injectIntl(PageTemplate);

const StyledHeroBlock = styled(HeroBlock)`
  grid-column: left / right-end;
  margin-bottom: 6rem;
`;

const StyledBodyContent = styled(BodyContent)`
  grid-column: col-two / col-eleven;

  > p:first-child {
    display: block;
    font-size: 28px;
    line-height: 36px;
    text-align: center;
  }

  > *:not(img) {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const query = graphql`
  query regularPage($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      node_locale
      title
      label
      featuredMedia {
        file {
          url
          contentType
        }
      }
      body {
        json
      }
    }
  }
`
