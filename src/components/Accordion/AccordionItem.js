// @flow
import React, { type Element } from 'react';
import AnimateHeight from 'react-animate-height';

import { AccordionItemTitle, AccordionItemButton, AccordionItemContainer, AccordionItemContent, Arrow } from './styles';

type Props = {
  id: string,
  title: string,
  isActive?: boolean,
  children: Element<any>,
  onClickTab?: (id: string) => void
}

export const AccordionItem = (props: Props) => {

  return (
    <AccordionItemContainer isActive={props.isActive}>
      <AccordionItemButton onClick={() => props.onClickTab && props.onClickTab(props.id)}>
        <AccordionItemTitle>{props.title}</AccordionItemTitle>
        <Arrow />
      </AccordionItemButton>
      <AnimateHeight className="animation" duration={300} height={props.isActive ? 'auto' : 0}>
        <AccordionItemContent>
          {props.children}
        </AccordionItemContent>
      </AnimateHeight>
    </AccordionItemContainer>
  );

}
