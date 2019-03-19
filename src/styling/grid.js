// @flow
import styled from 'styled-components';

export const GridWrap = styled.div`
  display: grid;
  grid-template-columns:
    [left] minmax(15px, 1fr)
    [left-end col-one-start] minmax(0px, 88px)
    [col-one-end col-two-start] minmax(0px, 88px)
    [col-two-end col-three-start] minmax(0px, 88px)
    [col-three-end col-four-start] minmax(0px, 88px)
    [col-four-end col-five-start] minmax(0px, 88px)
    [col-five-end col-six-start] minmax(0px, 88px)
    [col-six-end col-seven-start] minmax(0px, 88px)
    [col-seven-end col-eight-start] minmax(0px, 88px)
    [col-eight-end col-nine-start] minmax(0px, 88px)
    [col-nine-end col-ten-start] minmax(0px, 88px)
    [col-ten-end col-eleven-start] minmax(0px, 88px)
    [col-eleven-end col-twelve-start] minmax(0px, 88px)
    [col-twelve-end right] minmax(15px, 1fr);
  grid-column-gap: 1rem;
`;
