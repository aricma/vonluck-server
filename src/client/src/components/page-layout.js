import React, { Component } from 'react'
import styled, { createGlobalStyle, ServerStyleSheet } from 'styled-components'
import Nav from './nav.js'
import Footer from './footer.js'

const Layout = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Indie+Flower|Open+Sans');
  margin: 0;
  padding: 0;

  width: 100vw;

  background: #ECE9E6;
  background: linear-gradient(to bottom, #FFFFFF, #ECE9E6);

  position: relative;

  font-family: 'Open Sans', sans-serif;
`

const Content = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
`

export default props => (
    <Layout {...props}>
      <Nav />
      <Content>
        {props.children}
      </Content>
      <Footer />
    </Layout>
)
