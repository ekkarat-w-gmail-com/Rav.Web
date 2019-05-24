// @flow
import { css } from 'styled-components';
import { toNumber } from 'lodash/fp';

export const fixedAspectRatio = (ratio: string = '1:1') => {
  // Destructure resulting array into 'width' and 'height'
  const [width, height]: Array<string> = ratio.split(':');

  // Calculate percentage value using 'width' and 'height'
  const percentage: number = (toNumber(height) / toNumber(width)) * 100;

  return css`
    position: relative;
    width: 100%;
    height: auto;
    padding-top: ${percentage}%;
    overflow: hidden;
    > .video,
    > .img,
    > .image,
    > video,
    > img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      right: 0;
      bottom: 0;
      min-width: 100%;
      object-fit: cover;
      width: auto;
    }
  `;
};
