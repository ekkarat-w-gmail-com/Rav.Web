// @flow
import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components';
import Image from 'gatsby-image';
import { get, getOr } from 'lodash/fp';

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
    slug: string
  }
}

export default ({ data }: Props) => {
  const { product } = data;

  return (
    <Layout locale={getOr('en', 'node_locale', product)}>
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
          <small>Artikelnummer: {product.sku}</small>

          <CartButton>
            <span>
                {'Välj storlek'}
            </span>
            <span>
                {'Köp'}
            </span>
          </CartButton>

        </InfoColumn>

      </GridWrapper>
    </Layout>
  )
}

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

const TitleAndPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
`;

const Title = styled(Canon)`
  margin-bottom: 0;
  margin-right: 0.5rem;
`;

const Excerpt = styled(BodyCopy)`
  font-family: var(--font-serif);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-sand);
`;

export const CartButton = styled.button`
  position: relative;
  background-color: #000;
  color: #fff;
  border: none;
  width: 100%;
  height: 51px;
  cursor: pointer;
  overflow: hidden;
  margin: 40px 0 20px;
  &:focus {
    outline: 0;
  }

  &:disabled {
    color: #000;
    cursor: auto;
    background-color: #f4f4ef;
  }
  ${props => props.disabled && css`
      &:hover {
        > span {
          top: 0;
          &:last-child {
            top: 100%;
          }
        }
      }
    `};
  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: -100%;
    position: absolute;
    height: 100%;
    width: 100%;
    line-height: 2.5;
    font-size: 14px;
    transition: all 0.25s ease-in-out;
    &:last-child {
      top: 0;
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
      shortDescription {
        shortDescription
      }
      description {
        childContentfulRichText {
          html
        }
      }
      categories {
        id
      }
      featuredImage {
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
