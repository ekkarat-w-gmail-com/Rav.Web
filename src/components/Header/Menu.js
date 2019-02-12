// @flow
import React from 'react';
import { MenuWrapper, MenuLink } from './styles';

export const Menu = () => (
  <MenuWrapper>
    <MenuLink to={'/hammocks'}>Hammocks</MenuLink>
    <MenuLink to={'/gear'}>Gear</MenuLink>
  </MenuWrapper>
);
