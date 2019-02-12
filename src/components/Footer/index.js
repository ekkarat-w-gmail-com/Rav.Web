// @flow
import React from 'react';
import { FooterWrapper, ContentWrapper } from './styling';

export const Footer = () => {
  return (
    <FooterWrapper>
      <ContentWrapper>
        <p>&copy; {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">Gatsby</a></p>
      </ContentWrapper>
    </FooterWrapper>
  );
}
