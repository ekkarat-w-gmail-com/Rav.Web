import styled from 'styled-components';

export const Field = styled.div`
  position: relative;
  width: 100%;
  border-bottom-width: 0px;
  margin-bottom: 20px;
  transition: color 300ms ease 0s, padding-bottom 300ms ease 0s;
  overflow: hidden;
`;

export const FieldLabel = styled.span`
  top: ${props => props.isFocused ? '8px' : '18px'};
  font-family: var(--font-sans);
  font-size: ${props => props.isFocused ? '11px' : '13px'};
  font-weight: 400;
  line-height: 1.92;
  color: rgb(99, 99, 99);
  position: absolute;
  z-index: 2;
  left: 16px;
  pointer-events: none;
  transition: all 300ms ease 0s;
`;

export const FieldInput = styled.input`
  font-size: 14px;
  font-weight: 400;
  font-family: var(--font-sans);
  -webkit-appearance: none;
  height: 60px;
  box-sizing: border-box;
  width: 100%;
  padding-top: 20px;
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;
  border-radius: 2px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  outline: 0px;
  transition: all 300ms ease 0s;

  &:focus,
  &:active {
    border-color: var(--color-mustard);
  }

`;
