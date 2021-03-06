// @flow
import React from 'react';

// Components
import { HeroBlock } from './HeroBlock';
import { ProductsBlock } from './ProductsBlock';
import { PagesBlock } from './PagesBlock';

// Types
import type { Block, TypeOfBlock } from '../../types/block';

type Props = {
  type: TypeOfBlock,
  block: Block
}


export const BlockController = ({ type, block }: Props) => {

  switch(type) {
    case 'Hero':
      return <HeroBlock block={block} />;
    case 'References - Products':
      return <ProductsBlock block={block} />;
    case 'References - Pages':
      return <PagesBlock block={block} />;
    default: {
      console.warn(`Block with type "${type}" is missing a corresponding component`);
      return null;
    }

  }

}
