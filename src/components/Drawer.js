// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Portal } from './Portal';

type Props = {
  isOpen: boolean,
  children: any,
  className?: string,
  onBackDropClick?: () => void
}

export const Drawer = ({ isOpen, children, className, onBackDropClick }: Props) => {

  if ( !isOpen ) {
    return null;
  }

  return (
    <Portal>
      <Fragment>
        <Backdrop onClick={onBackDropClick} />
        <DrawerWrapper className={className}>{children}</DrawerWrapper>
      </Fragment>
    </Portal>
  );

}

const DrawerWrapper = styled.div`
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: 100;
  min-width: 290px;
  width: 540px;
  max-width: 90vw;
  padding: 2rem;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const Backdrop = styled.div`
  display: block;
  content: '';
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: var(--color-black);
  opacity: 0.8;
  cursor: pointer;
`;
