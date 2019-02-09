import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/page-layout.js'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

const Wrapper = styled.div`
  width: 100%;
  height: inherit;

  padding: 50px 0 50px 0;
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

const SignupSchema = Yup.object().shape({
  companyId: Yup.number()
    // .negative("This value can't nagtive.")
    .min(0, "This value can't nagtive")
    .max(9, 'Too Long!')
    .integer("This number can't have any decimal places.")
    .required('Required'),
  refNumber: Yup.number()
    .min(0, "This value can't nagtive.")
    // .negative("This value can't nagtive.")
    .integer("This number can't have any decimal places.")
    .required('Required'),
  // file: Yup.file()
  //   .email('Invalid email')
  //   .required('Required'),
});

export default class extends Component{
  onSubmit () {console.log('submitting')}
  render () {
    return (
      <Layout>
        <Wrapper>
          <h1>Monkey Office</h1>
          <p>use the numbers-to-monkey-office-csv-converter</p>
          <Formik
            initialValues={{
              companyId: null,
              refNumber: null,
              file: null
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              const {companyId, refNumber, file } = values
              console.log('is this been called?');
              setSubmitting(false)
              // axios.post('/webhooks/monkey-office', {
              //   headers: {'Content-Type': 'multipart/form-data'},
              //   data: {
              //     companyId,
              //     refNumber,
              //     "cash-reports": file,
              //   }
              // })
              // .then(() => {
              //   alert('done')
              //   setSubmitting(false)
              // })
              // .catch(() => alert('error'))
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              onSubmit,
              isSubmitting,
            }) => (
              <form>
                {/* onSubmit={() => onSubmit()}> */}
                <label className='company-Id'>
                  Laden ID
                  <Field
                    id='companyId'
                    type="number"
                    name="companyId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.companyId}
                  />
                  {errors.companyId && touched.companyId && <Error>{errors.companyId}</Error>}
                </label>
                <label className='ref-number'>
                  Letzte BelegNr. aus MonkeyOffice
                  <Field
                    id='refNumber'
                    type="number"
                    name="refNumber"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.refNumber}
                  />
                  {errors.refNumber && touched.refNumber &&  <Error>{errors.refNumber}</Error>}
                </label>
                {/* <label className='file'>
                  Numbers File
                  <Field
                    name="file"
                    type="file"
                    onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    // onBlur={handleBlur}
                    value={values.file}
                  />
                  {errors.password && touched.password && errors.password}
                </label> */}
                <button id='submit' onClick={() => this.onSubmit()}>convert</button>
                {/* type="submit" disabled={isSubmitting} */}
              </form>
            )}
          </Formik>
        </Wrapper>
      </Layout>
    )
  }
}
