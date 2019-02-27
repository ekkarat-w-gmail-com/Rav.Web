import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  background-color: var(--color-wine);
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1.3;
  letter-spacing: 1.2px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--color-wine);
  border-image: initial;
  border-radius: 2px;
  padding: 0px 20px;
  transition: all 300ms ease 0s;
  margin: 0px;
`;

const SizeButtonDisabled = css`
  color: #c6c6c6;
  cursor: auto;
  text-decoration: line-through;

  &:hover {
    border: none;
  }

`;

const SizeButtonSelected = css`
  background: var(--color-ivory);
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

export const SizeButton = styled.button`
  background: var(--color-grey);
  text-align: center;
  padding: 10px 0 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  width: 35px;
  border: 1px solid transparent;

  &:hover,
  &:focus {
    background: var(--color-ivory);
  };

  &:focus {
    outline: none;
  }

  ${({ disabled }) => disabled ? SizeButtonDisabled : ''}
  ${({ selected, disabled }) => selected && !disabled ? SizeButtonSelected : ''}
`;

const ColorButtonSelected = css`
  &::after {
    box-shadow: rgb(141, 141, 141) 0px 0px 0px 1px inset, rgb(255, 255, 255) 0px 0px 0px 4px inset;
  }
`;

export const ColorButton = styled.button`
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  appearance: none;
  border: 0 none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &::before,
  &::after {
    display: block;
    content: '';
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100%;
  }

  &::before {
    background: ${props => props.color ? props.color : 'var(--color-ivory)'};
  }

  &:focus {
    outline: none;
  }

  ${({ selected, disabled }) => selected && !disabled ? ColorButtonSelected : ''}

`;
