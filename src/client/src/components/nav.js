import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {routes} from '../data.js'

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 99;

  width: 100%;
  height: 50px;

  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: white;
  box-shadow: 0 10px 50px 0 rgba(0,0,0,.1);

  > .logo {
    font-weight: 800;
  }

  > .menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > a {
      padding: 5px 10px;
      box-sizing: border-box;
      margin: 0 5px;

      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      color: black;

      border-radius: 10px;
      border: 1px solid black;

      :hover {
        color: white;
        background: black;
      }
    }
  }
`

export default props => {
  return (
    <Nav>
      <div className='logo'>vonLuck Server</div>
      <div className='menu'>
        {
          routes.sort((a, b) => a.order - b.order).map(({route, name}, i) => {
            return (
              <Link key={i} to={route}>{name}</Link>
            )
          })
        }
      </div>
    </Nav>
  )
}
