// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
  html: string
}

export class KlarnaCheckout extends Component<Props> {

  checkoutContainer: { current: HTMLDivElement | null } = React.createRef();

  componentWillMount() {
    setTimeout(() => this.initKlarna(this.props.html), 0);
  }

  shouldComponentUpdate() {
    return false;
  }

  initKlarna(htmlSnippet: string) {

    if ( !htmlSnippet ) return;

    let checkoutContainer = document.getElementById('klarna-container');

    if ( !checkoutContainer ) return;

    checkoutContainer.innerHTML = htmlSnippet;
    let scriptsTags = checkoutContainer.getElementsByTagName('script');
    // This is necessary otherwise the scripts tags are not going to be evaluated
    for (let i = 0; i < scriptsTags.length; i++) {
      const parentNode = scriptsTags[i].parentNode;
      let newScriptTag = document.createElement('script');
      newScriptTag.type = 'text/javascript';
      newScriptTag.text = scriptsTags[i].text;
      if ( parentNode ) {
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    }
  }

  render() {
    return (
      <div ref={this.checkoutContainer}>
        <div id={'klarna-container'} />
      </div>
    );
  }
}
