// @flow
import React from 'react';
import { get, merge } from 'lodash/fp';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Image = ({ node }) => {
  const url = get('data.target.fields.file[sv].url', node);
  const alt = get('data.target.fields.title[sv]', node);
  return <img src={url} alt={alt} />
};

const DEFAULT_OPTIONS = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => <Image node={node} />
  }
};

export const createMarkupFromDocument = (json: string, options: Object) => {
  const config = merge(DEFAULT_OPTIONS, options);
  return documentToReactComponents(json, config);
};
