import styled from 'styled-components';
import { Card } from 'rebass';

export const BoxContainer = styled.div`
  display: grid;
  grid-gap: 30px;

  grid-template-columns: repeat(
    auto-fill,
    minmax(${props => props.minWidth}, 1fr)
  );
  justify-items: left;

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

export const Box = styled(Card).attrs({
  bg: '#F3F3F3',
  boxShadow: 0,
})`
  position: relative;
  borderradius: 10;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.25s;
  top: 0;
  height: 100%;
`;

export default Box;
