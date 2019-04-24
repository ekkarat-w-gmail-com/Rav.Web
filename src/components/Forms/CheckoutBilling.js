// @flow
import React, { useState, useEffect, Fragment } from 'react';
import { get, reduce, set } from 'lodash/fp';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import styled from 'styled-components';
import * as yup from 'yup';
import type { ValidationError } from 'yup';

// Components
import { Text, RadioBox } from '../Fields';
import { Minion } from '../../styling/typography';

// i18n
import * as i18n from '../../translations/keys';

// Types
type Props = {
  onChange: (Object) => void
}

const washErrors = (errors: Array<ValidationError>) => {

  const errs = reduce((sum, error: ValidationError) => {
    return set(error.path, error.message, sum);
  }, {}, errors);

  return errs;
}

export const CheckoutBilling = ({ onChange }: Props) => {

  const [ form, setValues ] = useState({
    emailAddress: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    zip: '',
    phone: '',
  });

  const [ errors, setError ] = useState(null);

  const handleOnInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const newForm = { ...form, [name]: value };

    // Save values
    setValues(newForm);

    // Check if valid
    formSchema.validate(newForm, { abortEarly: false })
      .then(() => {
        setError(null);
        onChange(newForm);
      })
      .catch((error) => {
        const errors = washErrors(error.inner);
        setError(errors);
      });

  }

  return (
    <Fragment>
      <Text label={'Email Address'} id={'emailAddress'} name={'emailAddress'} autocomplete={'email'} value={form.emailAddress} onChange={handleOnInputChange} />
      <FormattedMessage id={i18n.CHECKOUT_SHIPPING_ADDRESS}>
        {(txt) => (<LegendTitle>{txt}</LegendTitle>)}
      </FormattedMessage>
      <FieldGroup>
        <Text label={'First Name'} id={'firstName'} name={'firstName'} autocomplete={'first-name given-name'} value={form.firstName} onChange={handleOnInputChange} />
        <Text label={'Last Name'} id={'lastName'} name={'lastName'} autocomplete={'last-name family-name'} value={form.lastName} onChange={handleOnInputChange} />
      </FieldGroup>
      <Text label={'Phone'} id={'phone'} name={'phone'} autocomplete={'shipping phone'} value={form.phone} onChange={handleOnInputChange} />
      <Text label={'Street Address'} id={'streetAddress'} name={'streetAddress'} autocomplete={'shipping address-line1'} value={form.streetAddress} onChange={handleOnInputChange} />
      <FieldGroup>
        <Text label={'City'} id={'city'} name={'city'} autocomplete={'shipping city'} value={form.city} errorMessage={get('city', errors)} onChange={handleOnInputChange} />
        <Text label={'Zip'} id={'zip'} name={'zip'} autocomplete={'shipping zip'} value={form.zip} errorMessage={get('zip', errors)} onChange={handleOnInputChange} />
      </FieldGroup>
    </Fragment>
  );

}

let formSchema = yup.object().shape({
  emailAddress: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  streetAddress: yup.string().required(),
  city: yup.string().required(),
  zip: yup.string().required(),
  phone: yup.string().required(),
});

const LegendTitle = styled(Minion)`
  display: block;
  font-weight: 600;
  margin-bottom: 0.875rem;
  margin-top: 1.5rem;
`;

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 0;
`;
