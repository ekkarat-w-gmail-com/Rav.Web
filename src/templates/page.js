// @flow
import React from 'react'
import { get } from 'lodash/fp';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


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
      <HeroBlock block={heroBlock} />
      <BodyContent>
        {content}
      </BodyContent>
    </Layout>
  )
}


export default injectIntl(PageTemplate);

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
