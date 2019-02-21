import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const Footer = styled.footer`
  width: 100%;
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: ${darken(.01,'#ECE9E6')};

  padding: 20px;
  box-sizing: border-box;

  > p {
    line-height: 2;
    text-align: center;

    > a {
      text-decoration: none;
      color: black;
      border-radius: 10px;
      border: 1px solid black;
      padding: 5px 10px;
      box-sizing: border-box;

      :hover {
        color: white;
        background: black;
      }
    }
  }
`

export default props => (
  <Footer>
    <p>If you are having troubble and need support go check out the documentation on <a href='https://github.com/aricma/vonluck-server/' target='_blank' >Github</a><br /> or contact me via <a href='mailto:adrian@von-luck.de'>email</a>.</p>
  </Footer>
)
