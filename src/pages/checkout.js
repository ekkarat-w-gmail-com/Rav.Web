// @flow
import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import Layout from '../components/layout';
import { Text } from '../components/Fields';
import { Minion } from '../styling/typography';
import { StyledButton } from '../styling/buttons';

// Type
type Props = {

}

const Checkout = (props: Props) => {

  const [ activePanel ] = useState('first');
  const [ form, setValues ] = useState({
    emailAddress: '',
    name: '',
    streetAddress: '',
    shippingAddress2: '',
    city: '',
    zip: '',
    phone: '',
    state: ''
  });

  const handleOnInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...form, [name]: value });
  }

  return (
    <Layout>
      <Grid>
        <Panel isActive={activePanel === 'first'}>
          <PanelInner>
            <Text label={'Email Address'} id={'emailAddress'} name={'emailAddress'} autocomplete={'email'} value={form.emailAddress} onChange={handleOnInputChange} />
            <LegendTitle>{'Shipping Address'}</LegendTitle>
            <Text label={'Name'} id={'name'} name={'name'} autocomplete={'fullname'} value={form.name} onChange={handleOnInputChange} />
            <Text label={'Street Address'} id={'streetAddress'} name={'streetAddress'} autocomplete={'shipping address-line1'} value={form.streetAddress} onChange={handleOnInputChange} />
            <Text label={'Apt., Floor, Unit, etc.'} id={'shippingAddress2'} name={'shippingAddress2'} autocomplete={'shipping address-line2'} value={form.shippingAddress2} onChange={handleOnInputChange} />
            <FieldGroup>
              <Text label={'City'} id={'city'} name={'city'} autocomplete={'shipping city'} value={form.city} onChange={handleOnInputChange} />
              <Text label={'Zip'} id={'zip'} name={'zip'} autocomplete={'shipping zip'} value={form.zip} onChange={handleOnInputChange} />
              <Text label={'Phone'} id={'phone'} name={'phone'} autocomplete={'shipping phone'} value={form.phone} onChange={handleOnInputChange} />
              <Text label={'State'} id={'state'} name={'state'} autocomplete={'shipping state'} value={form.state} onChange={handleOnInputChange} />
            </FieldGroup>

            <ButtonWrap>
              <StyledButton>{'Next'}</StyledButton>
            </ButtonWrap>

          </PanelInner>
        </Panel>
        <Panel isActive={activePanel === 'second'}>
          <PanelInner>
          </PanelInner>
        </Panel>
        <Panel isActive={activePanel === 'third'}>
          <PanelInner>
          </PanelInner>
        </Panel>
      </Grid>
    </Layout>
  )
}

export default Checkout;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0;
`;

const Panel = styled.div`
  display: block;
  height: 100%;
  overflow-y: auto;
  min-height: calc(100vh - 140px);
  background-color: ${props => props.isActive ? 'var(--color-ivory)' : 'var(--color-grey)'};
`;

const PanelInner = styled.div`
  min-height: 100%;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
`;

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 0;
`;

const LegendTitle = styled(Minion)`
  display: block;
  font-weight: 600;
  margin-bottom: 0.875rem;
  margin-top: 1.5rem;
`;

const ButtonWrap = styled.div`
  margin-top: auto;
`;
