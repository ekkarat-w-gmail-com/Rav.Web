/* eslint-disable */
import styled, { css } from 'styled-components';

export const AccordionContainer = styled.div`

`;

const ActiveMixin = css`
  background: var(--color-grey);
`;

export const AccordionItemContainer = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-darkGrey);

  &:last-child {
    border-bottom: 1px solid var(--color-darkGrey);
  }

  ${props => props.isActive ? ActiveMixin : ''};

  ${AccordionItemButton} {
    background-color: ${props => props.isActive ? 'var(--color-grey)' : 'transparent'};
  }

`;

export const AccordionItemButton = styled.button`
  display: flex;
  flex-direction: row;
  appearance: none;
  width: 100%;
  height: 3.5rem;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0 none;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease-out 0s;

  &:hover {
    background-color: var(--color-grey);
  }

  &:focus {
    outline: 0;
  }

`;

export const AccordionItemTitle = styled.span`
  font-size: 13px;
  margin-left: 1rem;
  text-rendering: geometricPrecision;
`;

export const Arrow = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 40px;
  height: 40px;
  pointer-events: none;

  &::before,
  &::after {
    display: block;
    content: '';
    width: 10px;
    height: 1px;
    top: 50%;
    background: var(--color-black);
    position: absolute;
  }

  &::before {
    transform: rotate(-90deg);
    right: 15px;
  }

  &::after {
    transform: rotate(0deg);
    left: 15px;
  }
`;

export const AccordionItemContent = styled.div`
  padding: 0.5rem 22px 0.5rem 18px;
`;

export const AccordionHtmlContent = styled.div`
  white-space: pre-wrap;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-black);

  p {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
    color: var(--color-black);
  }

  strong {
    font-family: var(--font-serif);
    font-weight: 500;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding: 0;
    padding-left: 2rem;
  }

  li {
    font-size: inherit;
    line-height: inherit;
    margin-bottom: 4px;
  }

`;
