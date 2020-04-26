import styled from 'styled-components';
import { Card } from 'rebass';

export const Job = styled(Card).attrs({
  bg: '#F3F3F3',
  boxShadow: 0,
  borderRadius: 8,
})`
  position: relative;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.25s;
  top: 0;
`;

export default Job;
