// @flow
import React, { useState, type ChildrenArray, type Element } from 'react';
import { AccordionItem } from './AccordionItem';

import { AccordionContainer } from './styles';

type Props = {
  defaultOpen?: string, // Id of the child prop that should be open
  className?: string,
  children: ChildrenArray<Element<typeof AccordionItem>>
}

export const Accordion = (props: Props) => {
  const defaultActiveTab = props.defaultOpen ? props.defaultOpen : 0;
  const [ activeTab, setActiveTab ] = useState(defaultActiveTab);

  const handleOnClick = (id: string) => {
    if ( id === activeTab ) {
      setActiveTab(0)
    } else {
      setActiveTab(id)
    }
  }

  const children = React.Children.map(props.children, (child) => (
    React.cloneElement(child, {
      key: child.props.id,
      isActive: activeTab === child.props.id,
      onClickTab: () => handleOnClick(child.props.id)
    })
  ));

  return (
    <AccordionContainer className={props.className}>
      {children}
    </AccordionContainer>
  )

}
