// @flow
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components';
import Image from 'gatsby-image';
import { get, getOr, find, map, filter, includes } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';

// Components
import Layout from '../components/layout'
import { Price } from '../components/Price'

// Styling
import { Canon, BodyCopy, Brevier } from '../styling/typography';
import { SizeButton, ColorButton } from '../styling/buttons';

// Types
type Props = {
  data: {
    product: any
  },
  pageContext: {
    slug: string
  }
}

const getOptionFromVariant = (type: 'Color' | 'Size', variant: Array<any>) => {
  return find(option => option.name === type, get('selectedOptions', variant));
}

const SingleProduct = ({ data }: Props) => {
  const { product } = data;

  const variants = get('variants', product);
  const defaultVariant = find((variant) => variant.availableForSale === true, variants);

  const [ currentVariant, setVariant ] = useState(defaultVariant);

  // The options that we can build choices from
  const options = get('options', product)
  const colors = find(option => option.name === 'Color', options); // The values
  const sizes = find(option => option.name === 'Size', options); // The values

  // Get the selectedOptions from the currentVariant
  const variantColor = getOptionFromVariant('Color', currentVariant);
  const variantSize = getOptionFromVariant('Size', currentVariant);

  // Get variations with the same color that has available sizes
  // This is so that we can check if a certain size is available or not
  const availableSizes = filter((variant) => {

    // Get only variants with the current color
    const variantsWithColor = filter((v) => {
      const options = getOptionFromVariant('Color', v);
      return options.value === variantColor.value;
    }, variants);

    // Filter out those are not available for sale
    const availableForSale = filter(v => v.availableForSale === true, variantsWithColor);

    return includes(variant, availableForSale);

  }, variants);

  // Change variant when either clicking a color or size variant
  const handleOnVariantChange = (type: 'Color' | 'Size', selectedValue: string) => {

    // Since we also need to keep track of the other variant type when changing let's pick up the other one
    const otherType = type === 'Color' ? 'Size' : 'Color';

    // Get the current variant option based on the "other type"
    const currentVariantOtherOption = find(option => option.name === otherType, currentVariant.selectedOptions);

    // Lets find a relevant variant based on both color and size
    // E.g if a pick a red color and change from small to medium, then i want to keep track of
    // the color selection as well, otherwise it will just reset to the first choice
    const relevantVariant = find((relVariant) => {

      // Get the selected type
      const option = find(option => option.name === type, relVariant.selectedOptions);

      // Get the other type
      const otherOption = find(option => option.name === otherType, relVariant.selectedOptions);

      // Must have the same type as then value we clicked
      const isSameType = option.value === selectedValue;

      // Must have the same other type as the current variant
      const isSameOtherType = otherOption.value === currentVariantOtherOption.value;

      // Return only a variant which has the two properties
      return isSameType && isSameOtherType;
    }, variants);

    // Update state
    setVariant(relevantVariant);
  }

  const ColorButtons = map(val => (
    <ColorButton
      key={val}
      color={val.toLowerCase()}
      onClick={() => handleOnVariantChange('Color', val)}
      selected={variantColor.value === val} />
  ), colors.values);

  const SizeButtons = map(val => {
    const isDisabled = filter((v) => {
      const { value } = getOptionFromVariant('Size', v);
      return value === val;
    }, availableSizes);

    return (
      <SizeButton
        key={val}
        onClick={() => handleOnVariantChange('Size', val)}
        disabled={isDisabled.length === 0}
        selected={variantSize.value === val}>
          {val}
      </SizeButton>
    );
  }, sizes.values);

  return (
    <Layout locale={getOr('en', 'node_locale', product)}>
      <GridWrapper>

        <ImageColumn>
          <Image fluid={get('images[0].localFile.childImageSharp.fluid', product)} />
        </ImageColumn>

        <InfoColumn>
          <Title as={'h2'}>{get('title', product)}</Title>
          <Price regularPrice={get('price', currentVariant)} />
          <Excerpt as={'p'}>{get('description', product)}</Excerpt>

          <OptionTitle>{colors.name}</OptionTitle>
          <SizeList>
            {ColorButtons}
          </SizeList>

          <OptionTitle>{sizes.name}</OptionTitle>
          <SizeList>
            {SizeButtons}
          </SizeList>

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

export default SingleProduct;

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
  padding-bottom: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-sand);
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

const OptionTitle = styled(Brevier)`
  font-weight: 600;
  display: block;
`;

const SizeList = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
  margin-bottom: 1rem;

  ${SizeButton}:not(:last-child),
  ${ColorButton}:not(:last-child) {
    margin-right: 0.5rem;
  }

`;

export const query = graphql`
  query productShopifyQuery($id: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      id
      title
      description
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
