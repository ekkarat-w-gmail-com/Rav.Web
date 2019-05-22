// @flow
import React from 'react';

type Props = {
  height?: number,
  width?: number,
  color: string,
  className?: string
}

const defaultProps = {
  width: 13,
  height: 7,
  color: '#763679',
  className: ''
}

export const UpArrow = ({ height, width, color, className }: Props) => (
  <svg height={height} width={width} className={className} viewBox="0 0 13 7">
    <path fill={color} fillRule="evenodd" d="M6.5 0l.844.804L13 6.194 12.156 7 6.5 1.609.845 7 0 6.195 5.656.805 6.5 0z"></path>
  </svg>
);

UpArrow.defaultProps = defaultProps;

export const DownArrow = ({ height, width, color, className }: Props) => (
  <svg height={height} width={width} className={className} viewBox="0 0 13 7">
    <path fill={color} fillRule="evenodd" d="M6.5 7l-.844-.804L0 .806.844 0 6.5 5.391 12.155 0 13 .805l-5.656 5.39L6.5 7z"></path>
  </svg>
);

DownArrow.defaultProps = defaultProps;
