// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { has, get } from 'lodash/fp';

// Components
import Layout from '../components/layout';
import { Text, RadioBox } from '../components/Fields';
import { Minion, PicaIndex } from '../styling/typography';
import { StyledButton } from '../styling/buttons';
import { PostNord } from '../components/Icons/Brands/PostNord';
import { KlarnaCheckout } from '../components/KlarnaCheckout';

// Type
type Props = {
  checkout: { [key: string]: any },
}

const CheckoutComponent = (props: Props) => {

  const [ activePanel, setActivePanel ] = useState('first');
  const [ form, setValues ] = useState({
    emailAddress: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    zip: '',
    phone: '',
    deliveryOption: 'postNord'
  });

  const handleOnInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...form, [name]: value });
  }

  const handleOnShippingSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <Layout useCheckoutLayout={true}>
      <Grid>
        <Panel isActive={activePanel === 'first'}>
          <PanelInner onSubmit={handleOnShippingSubmit}>
            <PanelHeader>
              <PanelTitle>{'Shipping & Billing'}</PanelTitle>
            </PanelHeader>
            <Text label={'Email Address'} id={'emailAddress'} name={'emailAddress'} autocomplete={'email'} value={form.emailAddress} onChange={handleOnInputChange} />
            <LegendTitle>{'Shipping Address'}</LegendTitle>
            <FieldGroup>
              <Text label={'First Name'} id={'firstName'} name={'firstName'} autocomplete={'first-name given-name'} value={form.firstName} onChange={handleOnInputChange} />
              <Text label={'Last Name'} id={'lastName'} name={'lastName'} autocomplete={'last-name family-name'} value={form.lastName} onChange={handleOnInputChange} />
            </FieldGroup>
            <Text label={'Street Address'} id={'streetAddress'} name={'streetAddress'} autocomplete={'shipping address-line1'} value={form.streetAddress} onChange={handleOnInputChange} />
            <Text label={'Phone'} id={'phone'} name={'phone'} autocomplete={'shipping phone'} value={form.phone} onChange={handleOnInputChange} />
            <FieldGroup>
              <Text label={'City'} id={'city'} name={'city'} autocomplete={'shipping city'} value={form.city} onChange={handleOnInputChange} />
              <Text label={'Zip'} id={'zip'} name={'zip'} autocomplete={'shipping zip'} value={form.zip} onChange={handleOnInputChange} />
            </FieldGroup>
            <ButtonWrap>
              <StyledButton onClick={() => setActivePanel('second')}>{'Next'}</StyledButton>
            </ButtonWrap>
          </PanelInner>
        </Panel>
        <Panel isActive={activePanel === 'second'}>
        <PanelInner onSubmit={handleOnShippingSubmit}>
          <PanelHeader>
            <PanelTitle>{'Delivery & Payment'}</PanelTitle>
          </PanelHeader>

          <LegendTitle>{'Delivery Options'}</LegendTitle>
          <RadioBox label={'PostNord'} description={'1-2 weekdays'} icon={<PostNord />} id={'postNord'} name={'deliveryOption'} value={'postNord'} checked={form.deliveryOption === 'postNord'} onChange={handleOnInputChange} note={'Free'} />
          <RadioBox label={'PostNord - Hemleverans'} description={'4-7 weekdays'} icon={<PostNord />} id={'postNordHomeDelivery'} name={'deliveryOption'} value={'postNordHomeDelivery'} checked={form.deliveryOption === 'postNordHomeDelivery'} onChange={handleOnInputChange} note={'100kr'}/>

          <LegendTitle>{'Payment Options'}</LegendTitle>
          <StyledButton>{'Klarna'}</StyledButton>
          {has('html_snippet', props.checkout) && <KlarnaCheckout html={get('html_snippet', props.checkout)} />}

          <ButtonWrap>
            <StyledButton onClick={() => setActivePanel('third')}>{'Next'}</StyledButton>
          </ButtonWrap>
        </PanelInner>
        </Panel>
        <Panel isActive={activePanel === 'third'}>
        <PanelInner onSubmit={handleOnShippingSubmit}>
          <PanelHeader>
            <PanelTitle>{'Review order'}</PanelTitle>
          </PanelHeader>

        </PanelInner>
        </Panel>
      </Grid>
    </Layout>
  )
}

const mapStateToProps = ({ checkout }) => ({
  checkout: checkout
});

export default connect(mapStateToProps, { })(CheckoutComponent)

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0;
`;

const Panel = styled.div`
  display: block;
  height: 100%;
  overflow-y: auto;
  min-height: calc(100vh - 60px);
  background-color: ${props => props.isActive ? 'var(--color-ivory)' : 'var(--color-grey)'};
  opacity: ${props => props.isActive ? '1' : '0.3'};
`;

const PanelInner = styled.form`
  min-height: 100%;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const PanelTitle = styled(PicaIndex)`
  color: var(--color-black);
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
