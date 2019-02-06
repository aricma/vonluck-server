import React, {Component} from 'react'
import styled from 'styled-components'
import Layout from './layouts/index.jsx'

// const

export default class extends Component {
  render() {
    return (
      <Layout>
        <h1>Hello {this.props.name}</h1>
      </Layout>
    )
  }
}
