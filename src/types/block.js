// @flow

export type TypeOfBlock = 'Hero' | 'ContentBox-ImageLeft' | 'ContentBox-ImageRight' | 'References - Products';

export type BlockReferenceProduct =  {
  id: string,
  name: string,
  slug: string,
  shortDescription: {
    shortDescription: string,
  },
  featuredImage: {
    fixed: {
      src: string,
    }
  },
  internal: {
    type: 'ContentfulProduct',
  }
}

export type BlockReferenceCategory = {
  id: string,
  slug: string,
  name: string,
  internal: {
    type: 'ContentfulProductCategory'
  }
}

export type Block = {
  id: string,
  type: TypeOfBlock,
  title: string,
  label?: string,
  content: {
    childContentfulRichText: {
      html: string
    }
  },
  media: {
    id: string,
    file: {
      url: string,
      contentType: string
    }
  },
  references: Array<BlockReferenceProduct | BlockReferenceCategory>
}
