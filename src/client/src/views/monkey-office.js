import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/page-layout.js'
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import csv from '../test.csv'
import moment from 'moment'

const CancelToken = axios.CancelToken;
let cancel;

const Wrapper = styled.div`
  width: 100%;
  height: inherit;

  padding: 50px 10px 50px 10px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  text-align: center;

  > * {
    margin: 0;
    padding: 0;
  }

  > form {
    margin: 20px 0;
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > label {
      width: 100%;
      margin: 10px 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      > input {
        padding: 5px 10px;
        box-sizing: border-box;
        border-radius: 10px;
        border: 1px solid black;

        width: 100%;
        height: 50px;

        font-size: 18px;
        text-align: center;

        display: flex;
        justify-content: center;
        align-items: center;

        &[name="file"] {
          height: 35px;
        }

        :focus {
          outline: none;
        }
      }
    }

    button {
      height: 50px;
      margin: 10px 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      font-size: 18px;
      text-align: center;

      padding: 5px 20px;
      box-sizing: border-box;
      border-radius: 10px;
      border: 1px solid black;

      :hover {
        color: white;
        background-color: black;
      }

      :focus {
        outline: none;
      }
    }
  }
`

const Error = styled.span`
  color: red;
  text-decoration: none;
  text-align: center;
`

const ValidationSchema = Yup.object().shape({
  companyId: Yup.string().required('Required'),
  refNumber: Yup.string().required('Required'),
  file: Yup.mixed().required('Required')
});

const ComponentWrapper = props => (
  <Layout>
    <Wrapper {...props}>
      <h1>Monkey Office</h1>
      <p>use the numbers-to-monkey-office-csv-converter</p>
      {props.children}
    </Wrapper>
  </Layout>
)

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > img {
    margin: 10px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;

    &.download {
      max-width: 400px;
    }

    &.loading {
      max-width: 100px;
    }

    &.error {
      max-width: 200px;
    }
  }

  > span {
    font-size: 18px;
    color: black;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    margin: 10px 0;

    > * {
      margin: 0 5px !important;
    }
  }
  button {
    text-decoration: none;
    color: black;
    height: 50px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 18px;
    text-align: center;

    padding: 5px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid black;

    :hover {
      color: white;
      background-color: black;
    }

    :focus {
      outline: none;
    }
  }
`

const CSVIcon = props => (
  <svg viewBox="0 0 30 30" {...props}>
    <g transform="translate(-90 -640)">
      <path d="M92,667h20v-4h5v-11h-5v-4l-5-5H92V667z M116,653v9H96v-9H116z M93,644h14v4h4v4H95v11h16v3H93V644z"/>
      <rect x="98" y="659" width="1" height="1"/>
      <polygon points="100,660 104,660 104,659 101,659 101,656 104,656 104,655 100,655"/>
      <polygon points="105,658 108,658 108,659 105,659 105,660 109,660 109,657 106,657 106,656 109,656 109,655 105,655"/>
      <rect x="110" y="655" width="1" height="3"/>
      <rect x="113" y="655" width="1" height="3"/>
      <polygon points="111,659 112,659 112,660 113,660 113,658 112,658 111,658" />
    </g>
  </svg>
)

const Submitted = props => (
  <ComponentWrapper {...props}>
    <Message>
      <CSVIcon fill='black' width='100px' />
      {/* <img className='download' src='https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif' alt='mission accomplished'/> */}
      <span>{`${props.fileName}.csv`}</span>
      <span>Your Download will start automatically.</span>
      <span>If not feel free to use the button below.</span>
      <div>
        <button onClick={() => props.callbackDownload()}>Download</button>
        <button onClick={() => props.callbackReset()}>Reset</button>
      </div>
    </Message>
  </ComponentWrapper>
)

const Loading = props => (
  <ComponentWrapper {...props}>
    <Message>
      <img className='loading' src='https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif' alt='loading...'/>
      <div><button onClick={() => props.callbackCancel()}>Stop Converting</button></div>
    </Message>
  </ComponentWrapper>
)

const ErrorComponent = props => (
  <ComponentWrapper {...props}>
    <Message>
      <img className='error' src='https://media.giphy.com/media/3ohc1ffY03hnhRUyUU/giphy.gif' alt='Error message'/>
      <span>Server Error!</span>
      <span>Please check your input and try again.</span>
      <div>
        <button onClick={() => props.callbackReset()}>Try Again</button>
      </div>
    </Message>
  </ComponentWrapper>
)

export default class extends Component{
  constructor (props) {
    super(props)
    this.state = { fileName: '', response: '', submitted: false, error: false, loading: false }
  }

  submit(values, actions) {
    this.setState({loading: true})
    // console.log(values.file);
    // console.log('submitting...');
    var formData = new FormData()
    formData.append("companyId", values.companyId)
    formData.append("refNumber", values.refNumber)
    formData.append("file", values.file)
    axios({
      "method": "POST",
      "baseURL": "https://vonluck-server.herokuapp.com",
      "url": "/webhook/monkey-office",
      "headers": { "Content-Type": "multipart/form-data" },
      "data": formData,
      cancelToken: new CancelToken(function executor(c) { cancel = c })
    }).then(res => this.setState({submitted: true, response: res.data}, () => {
      // console.log('done');
      setTimeout(() => this.downloadCSV(res.data), 1500)
      actions.setSubmitting(false)
    }))
    .catch(err => {
      this.setState({ error: true }, console.log(err))
    })
  }

  downloadCSV(res = null, fn = null) {
    const { response, fileName } = this.state
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(res || response);
    hiddenElement.target = '_blank';
    hiddenElement.download = `${fn || fileName || 'download'}.csv`;
    hiddenElement.click();
  }

  cancel() { cancel(); this.reset() }

  reset() { this.setState({ fileName: '', response: '', submitted: false, error: false, loading: false }) }

  render () {
    const { submitted, error, loading, response } = this.state
    if (submitted) {
      return <Submitted fileName={this.state.fileName} callbackDownload={this.downloadCSV.bind(this)} callbackReset={this.reset.bind(this)} />
    } else if (error) {
      return <ErrorComponent callbackReset={this.reset.bind(this)} callbackCancel={() => this.cancel.bind(this)} />
    } else if (loading) {
      return <Loading fileName={this.state.fileName} callbackDownload={this.downloadCSV.bind(this)} callbackReset={this.reset.bind(this)} />
    } else {
      return (
        <ComponentWrapper>
          <Formik
            initialValues={{
              companyId: '',
              refNumber: '',
              file: '',
              separator: '',
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values, actions) => this.submit(values, actions)}
            render={props => {
              // const { values, errors, handleChange, handleBlur, handleSubmit, /* setFieldValue */ } = props
              return (
                <form onSubmit={props.handleSubmit} className='form'>
                  <label>
                    Company ID
                    <input
                      className='companyId'
                      type="text"
                      name='companyId'
                      placeholder='type in the "Firma_Id" from monkey office (e.g. 1, 2, 3, 4, 5)'
                      value={props.values.companyId}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    <Error>{props.errors.companyId}</Error>
                  </label>
                  <label>
                    Last Reference Number "BelegNummer"
                    <input
                      className='refNumber'
                      type="text"
                      name='refNumber'
                      placeholder='type in the last "Belegnummer" from MonkeyOffice'
                      value={props.values.refNumber}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    <Error>{props.errors.refNumber}</Error>
                  </label>
                  <label className="file">
                    File upload
                    <input id="file" name="file" type="file" onChange={event => {
                      const file = event.currentTarget.files[0]
                      const fileName = file.name
                      const newFileName = `${fileName.slice(0,fileName.indexOf('.csv')).toLowerCase()}-${moment().format('DD-MM-YYYY-HH-mm')}`
                      props.setFieldValue("file", event.currentTarget.files[0])
                      this.setState({fileName: newFileName})
                    }} className="form-control" />
                    {/* <Thumb file={values.file} /> */}
                    <Error>{props.errors.file}</Error>
                  </label>
                  <button type="submit">convert</button>
                </form>
              )
            }} />
        </ComponentWrapper>
      )
    }
  }
}

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }

    return (<img src={thumb}
      alt={file.name}
      // className="img-thumbnail mt-2"
      height={200}
      width={200} />);
  }
}
