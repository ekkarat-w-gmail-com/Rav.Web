// @flow
import styled from 'styled-components';

export const GridWrap = styled.div`
  display: grid;
  grid-template-columns:
    [left] minmax(9%, 1fr)
    [left-end col-one-start] minmax(0px, 72px)
    [col-one-end col-two-start] minmax(0px, 72px)
    [col-two-end col-three-start] minmax(0px, 72px)
    [col-three-end col-four-start] minmax(0px, 72px)
    [col-four-end col-five-start] minmax(0px, 72px)
    [col-five-end col-six-start] minmax(0px, 72px)
    [col-six-end col-seven-start] minmax(0px, 72px)
    [col-seven-end col-eight-start] minmax(0px, 72px)
    [col-eight-end col-nine-start] minmax(0px, 72px)
    [col-nine-end col-ten-start] minmax(0px, 72px)
    [col-ten-end col-eleven-start] minmax(0px, 72px)
    [col-eleven-end col-twelve-start] minmax(0px, 72px)
    [col-twelve-end right] minmax(9%, 1fr);
  grid-column-gap: 1.5vw;
`;
