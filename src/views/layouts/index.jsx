import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = /*createGlobalStyle*/`
  html, body {
    padding: 0;
    margin: 0;

    width: 100vw;
    height: 100vh;
  }

  html {
    position: relative;
  }

  body {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Layout = styled.div`
  margin: 0;
  padding: 10px;
  box-sizing: border-box;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default class extends Component {
  render() {
    const {children, title, description} = this.props
    return (
      <html>
        <head>
          <title>{title}</title>
          <style dangerouslySetInnerHTML={{__html: GlobalStyles}} />
        </head>
        <body>
          <Layout>
            <div>
              {children}
            </div>
          </Layout>
        </body>
      </html>
    );
  }
}
