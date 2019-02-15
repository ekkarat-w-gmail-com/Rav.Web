// @flow
import React from 'react';
import { map } from 'lodash/fp';
import { graphql, StaticQuery } from 'gatsby';

// Styles
import { MenuWrapper, MenuGroup, MenuGroupTitle, MenuNavigation, MenuLink } from './styles';

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
      <MenuGroup>
        <MenuGroupTitle>Look at our</MenuGroupTitle>
        <MenuNavigation>{categoryLinks}</MenuNavigation>
      </MenuGroup>
      <MenuGroup>
        <MenuGroupTitle>Read about</MenuGroupTitle>
        <MenuNavigation>
          <MenuLink to={'/about'}>The Company</MenuLink>
          <MenuLink to={'/about'}>Our policy</MenuLink>
          <MenuLink to={'/about'}>Our Blog</MenuLink>
        </MenuNavigation>
      </MenuGroup>

    </MenuWrapper>
  );
};

const Menu = (props: any) => (
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
