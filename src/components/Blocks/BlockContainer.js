// @flow
import React from 'react';
import styled from 'styled-components';
import { map, isEmpty } from 'lodash/fp';

// Components
import { BlockController } from './BlockController';

// Types
import type { Block } from '../../types/block';

type Props = {
  blocks: Array<Block>
}

export const BlockContainer = ({ blocks }: Props) => {

  if ( !blocks || isEmpty(blocks) ) {
    return null;
  }

  const blockComponents = map((block: Block) => <BlockController key={block.id} type={block.type} block={block} />, blocks);

  return (
    <BlockGrid>
      {blockComponents}
    </BlockGrid>
  );
};

const BlockGrid = styled.div`
  display: flex;
  flex-direction: column;
`;
