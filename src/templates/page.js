// @flow
import React from 'react'
import { get } from 'lodash/fp';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby'

type Props = {
  intl: intlShape,
  data: {
    brand: any
  },
  pageContext: {
    slug: string
  }
}

const BrandTemplate = ({ data, intl }: Props) => {
  const { brand } = data;
  return (
    <h1>{get('name', brand)}</h1>
  )
}


export default injectIntl(BrandTemplate);

export const query = graphql`
  query regularPage($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      node_locale
      title
    }
  }
`
