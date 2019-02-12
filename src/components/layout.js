// @flow
import React from "react"

import { Header } from "./Header"
import { Footer } from './Footer';

import "./layout.css"

type Props = {
  children: any
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout
