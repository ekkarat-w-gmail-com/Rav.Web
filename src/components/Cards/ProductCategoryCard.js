// @flow
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Badge } from '../Badge';

type Props = {
  title: string,
  to: string,
  backgroundImage?: string
}

export const ProductCategoryCard = ({ title, backgroundImage, to }: Props) => (
  <ProductCategoryWrapper to={to}>
    <BadgeTitle title={title} />
    {backgroundImage && <Image src={backgroundImage} />}
  </ProductCategoryWrapper>
);

ProductCategoryCard.defaultProps = {
  backgroundImage: '//houdini-server.web4.cloudnine.se/_images/4b63c80a-6f82-4ac8-8015-9a2e9ace273b/houdini-produkt-deepgreen-skiss-1.jpg?width=160&height=80&mode=crop'
}


const ProductCategoryWrapper = styled(Link)`
  background: rgb(244, 243, 241);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 80px;
  padding-right: 1.5rem;
  position: relative;
  text-decoration: none;
`;

const BadgeTitle = styled(Badge)`
  position: absolute;
  z-index: 2;
  top: -0.5rem;
  right: 0.5rem;
`;

const Image = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  margin: 0;
  max-height: 80px;
`;
