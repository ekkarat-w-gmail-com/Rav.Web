// @flow
import React from 'react';
import { map } from 'lodash/fp';
import { graphql, StaticQuery } from 'gatsby';

// Styles
import { MenuWrapper, MenuLink } from './styles';

// Types
type Props = {
  categories: any
}

export const MenuComponent = ({ categories }: Props) => {
  const categoryLinks = map(({node}) => (
    <MenuLink key={node.slug} to={`/category/${node.slug}`}>{node.name}</MenuLink>
  ), categories);
  return (
    <MenuWrapper>
      {categoryLinks}
      <MenuLink to={'/about'}>About</MenuLink>
    </MenuWrapper>
  );
};

const Menu = (props) => (
  <StaticQuery
    query={graphql`
      query {
        categories: allContentfulProductCategory {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    `}
    render={({categories}) => <MenuComponent categories={categories.edges} {...props} />}
  />
)

export default Menu;
