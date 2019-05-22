// @flow
import React from 'react';
import { get, map } from 'lodash/fp';
import { graphql, StaticQuery } from 'gatsby';

// Components
import { MegaMenu } from './MegaMenu';

// Styles
import { MenuWrapper, MenuGroup, MenuGroupTitle, MenuNavigation, MenuItem, MenuLink } from './styles';

// Utils
import { getRouteByType } from '../../utils/routes';

// Types
type Props = {
  menuItems: Array<Object>
}

export const MenuComponent = ({ menuItems }: Props) => {

  const links = map(({node}) => {
    const type = get('page.internal.type', node);
    const routePrefix = getRouteByType(type);
    return (
      <MenuItem key={node.id}>
        <MenuLink
          activeClassName={'active'}
          to={`${routePrefix}/${get('page.slug', node)}`}>
          {node.title}
        </MenuLink>
        <MegaMenu links={get('subpage', node)}/>
      </MenuItem>
    );
  }, menuItems);

  return (
    <MenuWrapper>
      <MenuGroup>
        <MenuNavigation>{links}</MenuNavigation>
      </MenuGroup>
    </MenuWrapper>
  );

};

const Menu = (props: any) => (
  <StaticQuery
    query={graphql`
      query {

        menuItems: allContentfulMenuItem {
          edges {
            node {
              id
              title
              order
              page {
                id
                slug
                internal {
                  type
                }
              }
              subpage {
                id
                name
                slug
                internal {
                  type
                }
              }
            }
          }
        }

      }
    `}
    render={({menuItems}) => <MenuComponent menuItems={menuItems.edges} {...props} />}
  />
)

export default Menu;
