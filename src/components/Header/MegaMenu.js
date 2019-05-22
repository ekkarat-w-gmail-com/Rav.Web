// @flow
import React from 'react';
import { map } from 'lodash/fp';
import { Link } from 'gatsby'

// Styling
import { MegaMenuWrapper, MegaMenuColumn } from './styles';
import { GridWrap } from '../../styling/grid';

// Utils
import { getRouteByType } from '../../utils/routes';

// Types
type Props = {
  links?: Array<Object>,
  product?: Object,
  featuredEntries?: Array<Object>
}

export const MegaMenu = ({ links, product, featuredEntries }: Props) => {

  const menuLinks = links && map(link => {
    const routePrefix = getRouteByType(link.internal.type);
    return <li key={link.id}><Link to={`${routePrefix}/${link.slug}`}>{link.name}</Link></li>
  }, links);

  return (
    <MegaMenuWrapper>
      <GridWrap>
        <MegaMenuColumn>
          <span></span>
          <ul>
            {menuLinks}
          </ul>
        </MegaMenuColumn>
      </GridWrap>
    </MegaMenuWrapper>
  );

}
