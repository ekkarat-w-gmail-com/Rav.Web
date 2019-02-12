import styled from 'styled-components';
import { Link } from 'gatsby'

export const TopBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-style: italic;
  background: var(--color-ivory);
  height: 2.5rem;

  p {
    margin: 0;
    padding: 0;
  }

  p:not(:last-child) {
    margin-right: 2rem;
  }

`;

export const HeaderWrapper = styled.header`
  background: #fff;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  position: relative;
  border-bottom: 1px solid var(--color-ivory);
`;

export const HeaderLink = styled(Link)`
  display: block;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);

  svg {
    height: 100%;
  }

  .letters {
    display: none;
  }

`;

export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-right: 4rem;
  }

`;

export const MenuGroupTitle = styled.span`
  font-size: 12px;
  font-style: italic;
  color: rgba(0, 0, 0, 0.42);
  margin-bottom: 5px;
  font-family: 'Open Sans', Georgia, 'sans-serif'
`;

export const MenuWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
`;

export const MenuNavigation = styled.nav`
  display: flex;
  flex-direction: row;
  transform: translateX(-1rem);
`;

export const MenuLink = styled(Link)`
  font-weight: 500;
  font-style: normal;
  font-size: 13px;
  display: block;
  padding: 0 1rem;
  text-decoration: none;
  color: var(--color-black);
  transition: color 300ms ease-in;

  &:hover,
  &:focus {
    color: var(--color-wine);
  }

`;
