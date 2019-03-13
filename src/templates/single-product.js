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
import { createOrderLine } from '../utils/product';
import * as translation from '../translations/keys';

// Components
import Layout from '../components/layout'
import { Price } from '../components/Price'
import { StockStatus } from '../components/StockStatus';
import { Accordion, AccordionItem, AccordionHtmlContent } from '../components/Accordion';

// Styling
import { Canon, BodyCopy } from '../styling/typography';

// Types
type Props = {
  addProductToCart: (product: any) => void,
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
  const descriptionHTML = { __html: description };

  const specifications = get('specifications.childContentfulRichText.html', product)
  const specificationsHTML = { __html: specifications };

  const careInstructions = get('careInstructions.childContentfulRichText.html', product)
  const careInstructionsHTML = { __html: careInstructions };

  const handleOnBuy = (event: HTMLButtonElement) => {
    if ( !event.disabled ) {
      const orderLine = createOrderLine(product)
      addProductToCart(orderLine);
    }
  }

  return (
    <Layout>
      <GridWrapper>

        <ImageColumn>
          <Image fluid={product.featuredImage.fluid} />
        </ImageColumn>

        <InfoColumn>

          <TitleAndPrice>
            <Title as={'h2'}>{product.name}</Title>
            <Price regularPrice={get('regularPrice', product)} salePrice={getOr(null, 'salePrice', product)} />
          </TitleAndPrice>

          <Excerpt as={'p'}>{get('shortDescription.shortDescription', product)}</Excerpt>

          <ProductAccordion>
            {
              description && (
                <AccordionItem title={intl.formatMessage({ id: translation.PRODUCT_ACCORDION_DESCRIPTION })} id={'description'}>
                  <AccordionHtmlContent dangerouslySetInnerHTML={descriptionHTML} />
                </AccordionItem>
              )
            }
            {
              specifications && (
                <AccordionItem title={intl.formatMessage({ id: translation.PRODUCT_ACCORDION_SPECIFICATION })} id={'specification'}>
                  <AccordionHtmlContent dangerouslySetInnerHTML={specificationsHTML} />
                </AccordionItem>
              )
            }
            {
              careInstructions && (
                <AccordionItem title={intl.formatMessage({ id: translation.PRODUCT_ACCORDION_CARE_INSTRUCTIONS })} id={'careInstructions'}>
                  <AccordionHtmlContent dangerouslySetInnerHTML={careInstructionsHTML} />
                </AccordionItem>
              )
            }
          </ProductAccordion>

          <CartButton disabled={get('stockQuantity', product) === 0} onClick={handleOnBuy}>
            <FormattedMessage
              id={translation.BUY_BUTTON_OUT_OF_STOCK}
              defaultMessage={'{title} is out of stock'}
              values={{ title: get('name', product) }}
            />
            <FormattedMessage id={translation.BUY_BUTTON_SELECT} />
          </CartButton>
          <ProductStockStatus quantity={get('stockQuantity', product)} />

        </InfoColumn>

      </GridWrapper>
    </Layout>
  )
}

const mapStateToProps = () => ({});
export default injectIntl(connect(mapStateToProps, { addProductToCart })(SingleProductTemplate));


const GridWrapper = styled.div`
  display: grid;
  grid-template-columns:
    [left] minmax(9%, 1fr)
    [col-one] minmax(0px, 72px)
    [col-two] minmax(0px, 72px)
    [col-three] minmax(0px, 72px)
    [col-four] minmax(0px, 72px)
    [col-five] minmax(0px, 72px)
    [col-six] minmax(0px, 72px)
    [col-six-end col-seven] minmax(0px, 72px)
    [col-seven-end col-eight] minmax(0px, 72px)
    [col-nine] minmax(0px, 72px)
    [col-ten] minmax(0px, 72px)
    [col-eleven] minmax(0px, 72px)
    [col-twelve] minmax(0px, 72px)
    [col-twelve-end right] minmax(9%, 1fr);
  grid-column-gap: 1.5vw;
`

const ImageColumn = styled.div`
  position: relative;
  display: block;
  grid-row: 1 / auto;
  grid-column: left / col-six;
  img {
    width: 100%;
    height: auto;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-column-start: col-seven;
  padding-left: 72px;
  grid-column-end: col-twelve-end;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const TitleAndPrice = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled(Canon)`
  margin-bottom: 1rem;
  margin-right: 0;
`;

const Excerpt = styled(BodyCopy)`
  font-family: var(--font-serif);
  margin-bottom: 0;
`;

const ProductStockStatus = styled(StockStatus)`
  margin-top: 1rem;
`;

const ProductAccordion = styled(Accordion)`
  margin-top: 2rem;
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
  margin: 40px 0 0;
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
