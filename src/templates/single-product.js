// @flow
import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components';
import Image from 'gatsby-image';
import { get, getOr } from 'lodash/fp';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// Actions
import { addProductToCart } from '../store/actions';

// Utils
import { createCartItem } from '../utils/product';
import * as translation from '../translations/keys';

// Components
import Layout from '../components/layout'
import { Price } from '../components/Price'
import { StockStatus } from '../components/StockStatus';
import { ProductInformation } from '../components/Blocks';

// Styling
import { GridWrap } from '../styling/grid';
import { Canon, BodyCopy, Trafalgar } from '../styling/typography';

// Types
import type { CartItem } from '../types/cart';
type Props = {
  addProductToCart: (cartItem: CartItem) => void,
  intl: intlShape,
  data: {
    product: any
  },
  pageContext: {
    slug: string
  }
}

const SingleProductTemplate = ({ data, intl, addProductToCart }: Props) => {

  const { product } = data;

  const description = get('description.childContentfulRichText.html', product)
  const specifications = get('specifications.childContentfulRichText.html', product)
  const careInstructions = get('careInstructions.childContentfulRichText.html', product)

  const handleOnBuy = (event: HTMLButtonElement) => {
    if ( !event.disabled ) {
      const cartItem = createCartItem(product)
      addProductToCart(cartItem);
    }
  }

  return (
    <Layout>

      <CustomGridWrap>

        <ImageColumn>
          <Image fluid={product.featuredImage.fluid} />
        </ImageColumn>

        <InfoColumn>

          <TitleAndPrice>
            <Title as={'h2'}>{product.name}</Title>
            <Price regularPrice={get('regularPrice', product)} salePrice={getOr(null, 'salePrice', product)} />
          </TitleAndPrice>

          <Excerpt as={'p'}>{get('shortDescription.shortDescription', product)}</Excerpt>

          <ProductStockStatus quantity={get('stockQuantity', product)} />

          <CartButton disabled={get('stockQuantity', product) === 0} onClick={handleOnBuy}>
            <FormattedMessage
              id={translation.BUY_BUTTON_OUT_OF_STOCK}
              defaultMessage={'{title} is out of stock'}
              values={{ title: get('name', product) }}
            />
            <FormattedMessage id={translation.BUY_BUTTON_SELECT} />
          </CartButton>

        </InfoColumn>

      </CustomGridWrap>

      <GridWrap>
        <StyledProductInfoBlock description={description} specifications={specifications} />
      </GridWrap>

    </Layout>
  )
}

const mapStateToProps = () => ({});
export default injectIntl(connect(mapStateToProps, { addProductToCart })(SingleProductTemplate));

const CustomGridWrap = styled(GridWrap)`
  background-image: url("https://www.fjallraven.se//media/i/seasonal_background_ss19_1-21646-4.jpg");
  background-position: 50%;
  background-size: cover;
  margin-bottom: 4rem;
`;

const ImageColumn = styled.div`
  position: relative;
  display: block;
  grid-row: 1 / auto;
  grid-column: col-one / col-six;
  margin-top: 2rem;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-column-start: col-seven;
  grid-column-end: col-twelve;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 3rem;
  background: var(--color-white);
`;

const TitleAndPrice = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Trafalgar)`
  margin: 0;
`;

const Excerpt = styled(BodyCopy)`
  font-family: var(--font-serif);
  margin-bottom: 2rem;
`;

const ProductStockStatus = styled(StockStatus)`
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
  margin: 1rem 0 0;
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

const StyledProductInfoBlock = styled(ProductInformation)`
  grid-column-start: col-one;
  grid-column-end: col-twelve;
`;

export const query = graphql`
  query productQuery($slug: String!) {
    product: contentfulProduct(slug: { eq: $slug }) {
      node_locale
      name
      regularPrice
      salePrice
      sku
      stockQuantity
      shortDescription {
        shortDescription
      }
      description {
        childContentfulRichText {
          html
        }
      }
      specifications {
        childContentfulRichText {
          html
        }
      }
      careInstructions {
        childContentfulRichText {
          html
        }
      }
      categories {
        id
      }
      featuredImage {
        file {
          url
        }
        fluid(quality: 100, maxWidth: 1000) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      images {
        file {
          url
          fileName
          contentType
          details {
            size
            image {
              width
              height
            }
          }
        }
      }
    }
  }
`
