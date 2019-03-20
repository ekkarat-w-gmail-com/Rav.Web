// @flow
import React, { type Element } from 'react';
import styled from 'styled-components';

import { FieldLabel, CustomRadioIcon } from './styles';

type Props = {
  id: string,
  name: string,
  value: string,
  label: string,
  checked: boolean,
  icon: Element<any>,
  description: string,
  note?: string,
  onChange: (SyntheticEvent<HTMLInputElement>) => void
}

export const RadioBox = ({ id, name, value, label, checked, icon, description, note, onChange }: Props) => {

  return (
    <FieldContainer htmlFor={id}>
      <RadioIcon isSelected={checked} />
      {icon && <ContentIconWrap>{icon}</ContentIconWrap>}
      <RadioContent>
        <RadioLabel>{label}</RadioLabel>
        {description && <RadioDescription>{description}</RadioDescription>}
      </RadioContent>
      {note && <RadioNote>{note}</RadioNote>}
      <HiddenInput
        type={'radio'}
        id={id}
        name={name}
        value={value}
        defaultChecked={checked}
        onChange={onChange}
        />
    </FieldContainer>
  )
}

const FieldContainer = styled.label`
  position: relative;
  width: 100%;
  border-bottom-width: 0px;
  margin-bottom: 4px;
  transition: color 300ms ease 0s, padding-bottom 300ms ease 0s;
  overflow: hidden;
  background: var(--color-white);
  padding: 1rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: var(--global-radius);
  cursor: pointer;
  border: 1px solid var(--color-darkGrey);
`;

const ContentIconWrap = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    max-width: 80px;
    height: auto;
  }
`;

const RadioContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const RadioLabel = styled(FieldLabel)`
  position: static;
  top: auto;
  left: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: var(--color-black);
`;

const RadioDescription = styled.span`
  font-size: 11px;
  font-weight: 400;
  color: rgb(0, 0, 0, 0.54);
`;

const RadioNote = styled.span`
  font-weight: 400;
  font-size: 12px;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const RadioIcon = styled(CustomRadioIcon)`
  margin-right: 1rem;
`;
