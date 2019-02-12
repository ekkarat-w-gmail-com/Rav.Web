import styled from 'styled-components';
import { Link } from 'gatsby'

export const HeaderWrapper = styled.header`
  background: var(--color-ivory);
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  position: relative;
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


export const MenuWrapper = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
`;

export const MenuLink = styled(Link)`
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  display: block;
  padding: 0 1.5rem;
  text-decoration: none;
  color: var(--color-black);
`;
