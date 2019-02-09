import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Layout from '../components/page-layout.js'
import MonkeyOffice from './monkey-office.js'
import Image from '../components/img.js'

const Paragraph = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > h1 {
    text-align: center;
  }
  > p {
    text-align: justify;
  }
`

const Home = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    this.setState({width: window.innerWidth, height: window.innerHeight, loading: false})
  }

  render () {
    const {loading, width, height} = this.state
    return (
      <Layout>
        {loading ? 'loading ...' : <Image link='https://res.cloudinary.com/aricma/image/upload/v1549747276/vonLuck/server.jpg' width={width} height='400'/>}
        <Paragraph>
          <h1>Welcome to the vonLuck server</h1>
          <p>What you see is the client side of the vonLuck server. This webseite is still in progress but give me a change to tell you what we will be creating here.</p>
          <p>We will make every Webhook, Webtask, Cronjob, and API Endpiont accsesable. Despite the elaborated documentation about the hole server and its potential.</p>
          <p>Best, Adrian | vonLuck</p>
        </Paragraph>
      </Layout>
    )
  }
}

export default class extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/monkey-office' render={() => <MonkeyOffice />} />
      </Switch>
    );
  }
}
