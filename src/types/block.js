// @flow

export type TypeOfBlock = 'Hero' | 'ContentBox-ImageLeft' | 'ContentBox-ImageRight' | 'References - Products' | 'References - Pages';

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

export type BlockReferencePage = {
  id: string,
  title: string,
  slug: string,
  excerpt: {
    excerpt: string
  },
  featuredMedia: {
    fixed: {
      src: string
    }
  },
  internal: {
    type: 'ContentfulPage'
  }
}

export type BlockReference = BlockReferenceProduct | BlockReferenceCategory | BlockReferencePage;

export type Block = {
  id?: string,
  type: TypeOfBlock,
  title: string,
  label?: string,
  content?: {
    childContentfulRichText: {
      html: string
    }
  },
  media: {
    file: {
      url: string,
      contentType: string
    }
  },
  references?: Array<BlockReference>
}
