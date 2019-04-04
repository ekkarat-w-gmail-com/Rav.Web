// @flow
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

// Components
import { Paragon, BodyCopy } from '../../styling/typography';

// Utils
import * as translation from '../../translations/keys';

// Type
type Props = {
  description: string,
  specifications: string,
  className?: string
}

export const ProductInformation = ({ description, specifications, className }: Props) => {

  const descriptionHTML = { __html: description };
  const specificationsHTML = { __html: specifications };

  return (
    <BlockWrap className={className}>
      <ContentBlock>
        <FormattedMessage id={translation.PRODUCT_ACCORDION_DESCRIPTION}>
          {(txt) => <Title>{txt}</Title>}
        </FormattedMessage>
        <HTMLContent as={'div'} dangerouslySetInnerHTML={descriptionHTML} />
      </ContentBlock>
      <ContentBlock>
        <FormattedMessage id={translation.PRODUCT_ACCORDION_SPECIFICATION}>
          {(txt) => <Title>{txt}</Title>}
        </FormattedMessage>
        <HTMLContent as={'div'} dangerouslySetInnerHTML={specificationsHTML} />
      </ContentBlock>
    </BlockWrap>
  )
}

const BlockWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  border: 2px solid #d6d6d6;
  border-radius: var(--global-radius);
`;

const ContentBlock = styled.div`
  width: 50%;

  &:last-child {
    width: calc(50% - 60px);
    padding-left: 60px;
    border-left: 2px solid #d6d6d6;
    font-size: 14px;
    line-height: 26px;
    margin-left: 60px;
  }

`;

const HTMLContent = styled(BodyCopy)`
  font-family: var(--font-serif);
  margin-bottom: 2rem;
`;

const Title = styled(Paragon)`
  margin-bottom: 1.5rem;
`;
