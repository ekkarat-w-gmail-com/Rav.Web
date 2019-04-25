// @flow
import React, { useState } from 'react';

import { Field, FieldLabel, FieldInput, FieldErrorMessage } from './styles';

type Props = {
  id: string,
  name: string,
  value: string,
  label: string,
  errorMessage?: string,
  autocomplete?: string,
  autocorrect?: boolean,
  onChange: (SyntheticEvent<HTMLInputElement>) => void
}

export const Text = ({ id, name, value, label, errorMessage, autocomplete, autocorrect, onChange }: Props) => {

  const useAutoCorrect = autocorrect ? 'on' : 'off';

  const [ isFocused, setFocus ] = useState(false);

  const handleOnFocus = () => setFocus(true);
  const handleOnBlur = () => setFocus(false);

  const error = errorMessage && (<FieldErrorMessage>{errorMessage}</FieldErrorMessage>);

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
          hasError={errorMessage}
          onChange={onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur} />
          {error}
      </label>
    </Field>
  )
}
