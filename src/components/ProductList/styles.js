import styled from 'styled-components';

export const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 4}, 1fr);
  grid-column-gap: 2rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;
