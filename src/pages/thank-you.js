// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get, has } from 'lodash/fp';

// Actions
import { getKlarnaCheckoutById } from '../store/actions';

// Components
import Layout from '../components/layout'
import SEO from '../components/seo'
import { KlarnaCheckout } from '../components/KlarnaCheckout';

type Props = {
 location: Object,
 checkout: Object,
 getKlarnaCheckoutById: (orderId: string) => void
}

const ThankYou = (props: Props) => {

  const urlParams = new URLSearchParams(props.location.search);
  const myParam = urlParams.get('sid');

  useEffect(() => {
    if ( myParam ) {
      props.getKlarnaCheckoutById(myParam);
    }
  }, [ myParam ])

  return (

    <Layout>
      <SEO title={'Thanks for your purchase!'} />
      {has('html_snippet', props.checkout) && <KlarnaCheckout html={get('html_snippet', props.checkout)} />}
    </Layout>

  );
}

const mapStateToProps = (store) => ({
  checkout: store.checkout
})


export default connect(mapStateToProps, { getKlarnaCheckoutById })(ThankYou)
