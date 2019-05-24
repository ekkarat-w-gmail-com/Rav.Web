import styled, { css } from 'styled-components';
import { Link } from 'gatsby'

const TOP_BAR_HEIGHT = 40;
const HEADER_HEIGHT = 70;

const HEADER_TOTAL_HEIGHT = TOP_BAR_HEIGHT + HEADER_HEIGHT;

export const TopBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-style: italic;
  background: var(--color-ivory);
  height: ${TOP_BAR_HEIGHT}px;

  p {
    margin: 0;
    padding: 0;
  }

  p:not(:last-child) {
    margin-right: 2rem;
  }

`;

export const CheckoutHeaderMixin = css`
  height: 60px;
`;

export const HeaderWrapper = styled.header`
  background: #fff;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  position: relative;

  ${props => props.slim ? CheckoutHeaderMixin : ''}

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

export const MenuGroup = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;

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
  height: 100%;
`;

export const MenuNavigation = styled.ul`
  display: flex;
  flex-direction: row;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const MenuLink = styled(Link)`
  font-style: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1rem;
  text-decoration: none;
  color: var(--color-black);
  transition: color 300ms ease-in;
  position: relative;

  &::after {
    display: block;
    content: '';
    width: 0;
    height: 1px;
    background: var(--color-black);
    transition: width 300ms ease-in;
    position: absolute;
    bottom: 0;
    pointer-events: none;
  }

  &.active::after,
  &:hover::after,
  &:focus::after {
    width: 100%;
  }

`;

export const MegaMenuWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  background: var(--color-ivory);
  position: absolute;
  top: auto;
  left: 0;
  right: 0;
  transform: translateY(-100%);
  visibility: hidden;
  z-index: 50;
  padding-top: 2rem;
`;

export const MenuItem = styled.li`
  height: 100%;

  &:hover > ${MegaMenuWrapper} {
    visibility: visible;
    transform: translateY(0);
  }

`;

export const MegaMenuColumn = styled.div`
  grid-column: col-one / span 4;
`;
