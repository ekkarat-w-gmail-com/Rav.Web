// @flow
import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components';
import Image from 'gatsby-image';
import { get, getOr, map } from 'lodash/fp';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// Actions
import { addProductToCart } from '../store/actions';

// Utils
import { createCartItem } from '../utils/product';
import * as translation from '../translations/keys';

// Components
import Layout from '../components/layout'
import { Price, CurrentPrice, OldPrice } from '../components/Price'
import { StockStatus } from '../components/StockStatus';
import { ProductInformation } from '../components/Blocks';
import { Badge } from '../components/Badge';

// Styling
import { GridWrap } from '../styling/grid';
import { Canon, BodyCopy, Trafalgar, GreatPrimer } from '../styling/typography';

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

  const labels = map((label) => <BadgeLabel key={label} title={label} />, get('labels', product));

  return (
    <Layout>

      <CustomGridWrap>

        <ImageColumn>
          {get('labels', product) && (
            <ProductLabels>
              {labels}
            </ProductLabels>
          )}
          <Image fluid={product.featuredImage.fluid} />
        </ImageColumn>

        <InfoColumn>

          <ProductHeader>
            <Titles>
              <Subtitle as={'h3'}>{get('brand.name', product)}</Subtitle>
              <Title as={'h2'}>{product.name}</Title>
            </Titles>
            {get('brand.logotype.fluid', product) && (
              <BrandLogotype>
                <Image fluid={get('brand.logotype.fluid', product)} />
              </BrandLogotype>
            )}
          </ProductHeader>

          <PriceWrap>
            <FormattedMessage id={translation.PRODUCT_PRICE_TITLE} />:
            <ProductPrice regularPrice={get('regularPrice', product)} salePrice={getOr(null, 'salePrice', product)} />
          </PriceWrap>

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
  border-radius: var(--global-radius);

  img {
    width: 100%;
    height: auto;
  }
`;

const ProductLabels = styled.div`
  position: absolute;
  left: 1rem;
  z-index: 1;
  transform: translateY(-50%);
`;

const BadgeLabel = styled(Badge)``;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-column-start: col-seven;
  grid-column-end: col-twelve;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 3rem;
  background: var(--color-white);
  border-radius: var(--global-radius);
  position: relative;
`;

const ProductHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const BrandLogotype = styled.div`
  width: 10rem;
  height: auto;
`;

const Titles = styled.div``;

const Title = styled(Trafalgar)`
  margin: 0;
  font-weight: 700;
`;

const Subtitle = styled(GreatPrimer)`
  margin-bottom: 8px;
  font-style: italic;
  font-family: var(--font-serif);
`;

const PriceWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  line-height: 22px;
`;

const ProductPrice = styled(Price)`
  margin-left: 4px;

  ${CurrentPrice} {
    font-size: 16px;
    line-height: 22px;
  }

`;

const Excerpt = styled(BodyCopy)`
  font-family: var(--font-serif);
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--color-sand);
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
      labels
      brand {
        name
        slug
        logotype {
          id
          file {
            url
          }
          fluid(quality: 100, maxWidth: 1000) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
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
