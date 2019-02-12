// @flow

import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string,
  className?: string
}

export const Badge = ({ title, className }: Props) => (
  <BadgeWrapper className={className}>{title}</BadgeWrapper>
)

Badge.defaultProps = {
  className: ''
}

const BadgeWrapper = styled.span`
  display: inline-block;
  font-weight: 400;
  font-style: normal;
  background-color: rgb(202, 191, 177);
  font-size: 12px;
  color: rgb(255, 255, 255);
  padding: 6px 10px 5px;
  margin: 0px 4px;
  border-radius: 2px;
`;
