// @flow
import React, { useState } from 'react';

import { Field, FieldLabel, FieldInput } from './styles';

type Props = {
  id: string,
  name: string,
  value: string,
  label: string,
  autocomplete: string,
  autocorrect: boolean,
  onChange: (SyntheticEvent<HTMLInputElement>) => void
}

export const Text = ({ id, name, value, label, autocomplete, autocorrect, onChange }: Props) => {

  const useAutoCorrect = autocorrect ? 'on' : 'off';

  const [ isFocused, setFocus ] = useState(false);

  const handleOnFocus = () => setFocus(true);
  const handleOnBlur = () => setFocus(false);


  return (
    <Field>
      <label htmlFor={id}>
        <FieldLabel isFocused={isFocused || value}>{label}</FieldLabel>
        <FieldInput
          type={'text'}
          id={id}
          name={name}
          autocomplete={autocomplete}
          autocorrect={useAutoCorrect}
          value={value}
          onChange={onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur} />
      </label>
    </Field>
  )
}
