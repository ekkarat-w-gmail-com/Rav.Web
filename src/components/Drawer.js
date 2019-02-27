// @flow
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Portal } from './Portal';

type Props = {
  isOpen: boolean,
  children: any,
  fromSide?: 'left' | 'right',
  className?: string,
  onBackDropClick?: () => void
}

export const Drawer = ({ isOpen, children, fromSide, className, onBackDropClick }: Props) => {

  useEffect(() => {
    isOpen && document.body ? document.body.classList.add('locked') : document.body.classList.remove('locked');
    return () => document.body.classList.remove('locked');
  })

  const content = isOpen ? (
    <CSSTransition key={`drawer`} timeout={450} classNames="drawer">
      <DrawerContainer fromSide={fromSide}>
        <Backdrop onClick={onBackDropClick} />
        <DrawerWrapper className={className}>
          {children}
        </DrawerWrapper>
      </DrawerContainer>
    </CSSTransition>
  ) : null;

  return (
    <Portal>
      <TransitionGroup>
        {content}
      </TransitionGroup>
    </Portal>
  );

}

Drawer.defaultProps = {
  fromSide: 'right',
  className: ''
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
  transform: translateY(100%);
  transition: transform 450ms ease-in-out;
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
  cursor: pointer;
  transition: opacity 400ms ease-in-out;
`;

const DrawerContainer = styled.div`
  &.drawer-enter ${DrawerWrapper}, &.drawer-exit-active ${DrawerWrapper} {
    transform: ${props => {
      if (props.fromSide === 'left') return `translateX(-100%)`;
      if (props.fromSide === 'right') return `translateX(100%)`;
      return 'none';
    }};
  }
  &.drawer-enter-active ${DrawerWrapper}, &.drawer-enter-done ${DrawerWrapper} {
    transform: ${props => {
      if (props.fromSide === 'left') return `translateX(0)`;
      if (props.fromSide === 'right') return `translateX(0)`;
      return 'none';
    }};
  }
  &.drawer-enter ${Backdrop}, &.drawer-exit-active ${Backdrop} {
    opacity: 0;
  }
  &.drawer-enter-active ${Backdrop}, &.drawer-enter-done ${Backdrop} {
    opacity: 0.8;
  }
`;
