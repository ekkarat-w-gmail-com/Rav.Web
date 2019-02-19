// @flow
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components';
import Image from 'gatsby-image';
import { get, find } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';

// Components
import Layout from '../components/layout'
import { Price } from '../components/Price'

// Styling
import { Canon, BodyCopy } from '../styling/typography';

// Types
type Props = {
  data: {
    product: any
  },
  pageContext: {
    id: string
  }
}

const ProductVariation = ({ data }: Props) => {
  const { product } = data;

  const variants = get('variants', product);
  const defaultVariant = find((variant) => variant.availableForSale === true, variants);

  const [ currentVariant ] = useState(defaultVariant);

  const descriptionHtml = get('descriptionHtml', product);
  const html = { __html: descriptionHtml };

  return (
    <Layout>
      <GridWrapper>

        <ImageColumn>
          <Image fluid={get('images[0].localFile.childImageSharp.fluid', product)} />
        </ImageColumn>

        <InfoColumn>
          <Title as={'h2'}>{get('title', product)}</Title>
          <Price regularPrice={get('price', currentVariant)} />
          <Excerpt as={'div'} dangerouslySetInnerHTML={html} />

          <CartButton disabled={!get('availableForSale', currentVariant)}>
            <FormattedMessage
              id="CartButton.ProductOutOfStock"
              defaultMessage={'{title} is out of stock'}
              values={{ title: get('title', currentVariant) }}
            />
            <FormattedMessage id="CartButton.Buy" />
          </CartButton>

          <small>
            <FormattedMessage id="ProductMeta.SKU" />: {get('sku', currentVariant)}
          </small>

        </InfoColumn>

      </GridWrapper>
    </Layout>
  )
}

export default ProductVariation;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns:
    [left] minmax(9%, 1fr)
    [col-one] minmax(0px, 70px)
    [col-two] minmax(0px, 70px)
    [col-three] minmax(0px, 70px)
    [col-four] minmax(0px, 70px)
    [col-five] minmax(0px, 70px)
    [col-six] minmax(0px, 70px)
    [col-six-end col-seven] minmax(0px, 70px)
    [col-eight] minmax(0px, 70px)
    [col-nine] minmax(0px, 70px)
    [col-ten] minmax(0px, 70px)
    [col-eleven] minmax(0px, 70px)
    [col-twelve] minmax(0px, 70px)
    [col-twelve-end right] minmax(9%, 1fr);
  grid-column-gap: 1.5vw;
`

const ImageColumn = styled.div`
  position: relative;
  display: block;
  grid-row: 1 / auto;
  grid-column: left / col-six-end;

  img {
    width: 100%;
    height: auto;
  }

`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-column-start: col-eight;
  grid-column-end: col-twelve-end;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;


const Title = styled(Canon)`
  margin-bottom: 0.5rem;
`;

const Excerpt = styled(BodyCopy)`
  font-family: var(--font-serif);
  margin-top: 2rem;

  > p:last-child {
    margin-bottom: 0;
  }

`;

const disabledMixin = css`
  &:hover > span {

    &:first-child {
      transform: translateY(0);
    }

    &:last-child {
      transform: translateY(0);
    }

  }
`;

const CartButton = styled.button`
  position: relative;
  background-color: #000;
  color: #fff;
  width: 100%;
  height: 3rem;
  cursor: pointer;
  overflow: hidden;
  margin: 40px 0 20px;
  border-radius: 3px;
  border: 0 none;

  &:focus {
    outline: 0;
  }

  &:disabled {
    color: #000;
    cursor: auto;
    background-color: var(--color-ivory);
  }

  ${props => props.disabled ? disabledMixin : ''}

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: 14px;
    transition: all 0.25s ease-in-out;

    &:first-child {
      transform: translateY(-100%);
    }

    &:last-child {
      transform: translateY(-100%);
    }

  }

`;

export const query = graphql`
  query($id: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      id
      title
      description
      descriptionHtml
      availableForSale
      productType
      handle
      shopifyId
      images {
        localFile {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1000) {
              sizes
              src
              srcSet
              srcSetWebp
              aspectRatio
          	}
          }
        }
      }
      options {
        name
        values
      }
      variants {
        sku
        title
        price
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
  }
`
