// @flow
import { Component } from 'react'
import ReactDOM from 'react-dom'

// Use a ternary operator to make sure that the document object is defined
const portalRoot = typeof document !== `undefined` ? document.getElementById('portal') : null

type Props = {
  children: any
}

export class Portal extends Component<Props> {

  mountNode: HTMLDivElement | null

  constructor() {
    super()
    // Use a ternary operator to make sure that the document object is defined
    this.mountNode = typeof document !== `undefined` ? document.createElement('div') : null
  }

  componentDidMount() {
    if ( portalRoot && this.mountNode ) {
      portalRoot.appendChild(this.mountNode)
      if ( document.body ) {
        document.body.classList.add('locked');
      }
    }
  }

  componentWillUnmount() {
    if ( portalRoot && this.mountNode ) {
      portalRoot.removeChild(this.mountNode)
      if ( document.body ) {
        document.body.classList.remove('locked')
      }
    }
  }

  render() {
    const { children } = this.props

    // Check that this.mountNode is not null before using ReactDOM.createPortal
    return this.mountNode ? ReactDOM.createPortal(children, this.mountNode) : null;

  }
}
