// @flow
import styled from 'styled-components';

// Typographic table
//
// Name           Example Usage	                        Group A	  Group B	  Group C	  Group D
// ==========================================================================================
// Canon          Hero or blog post title	              28/32	    32/36	    52/56	    44/48
// Trafalgar      Article title or section header	      20/24	    24/28	    36/40	    32/36
// Paragon        Primary headline on indexes	          20/24	    22/26	    28/32	    28/32
// Double Pica    Sub header                            20/24	    20/24	    26/30	    24/28
// Great Primer   Headline title or subtitle            18/22	    18/22	    21/24	    20/24
// Body Copy      Article body copy only                15/20	    16/22	    18/24	    16/22
// Pica	Index     links, titles & headlines             15/20	    16/20	    18/22	    16/20
// Long Primer    Index body copy & image captions      15/18	    15/18	    15/20	    14/18
// Brevier        Time stamps and bylines               14/16	    14/18	    14/18	    13/16
// Minion         Small header capitals                 12/16	    12/16	    13/16	    12/16
// ==========================================================================================

export const Canon = styled.h1`
  font-size: 44px;
  line-height: 48px;
`;

export const Trafalgar = styled.h2`
  font-size: 32px;
  line-height: 36px;
`;

export const Paragon = styled.h3`
  font-size: 28px;
  line-height: 32px;
`;

export const DoublePica = styled.h4`
  font-size: 24px;
  line-height: 28px;
`;

export const GreatPrimer = styled.h4`
  font-size: 20px;
  line-height: 24px;
`;

export const BodyCopy = styled.p`
  font-size: 18px;
  line-height: 28px;
`;

export const PicaIndex = styled.h5`
  font-size: 16px;
  line-height: 20px;
`;

export const LongPrimer = styled.p`
  font-size: 14px;
  line-height: 18px;
`;

export const Brevier = styled.span`
  font-size: 13px;
  line-height: 16px;
`;

export const Minion = styled.span`
  font-size: 12px;
  line-height: 16px;
`;
