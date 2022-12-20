import { Formik, Form as FormikForm, Field as FormikField, FormikValues } from 'formik'
import { get, mapValues } from 'lodash'

import toast from '@/shared/utils/toast'
import { is, generateErrors } from '@/shared/utils/validation'

import Field from './Field'

interface FormProps {
  validate?: (...args: any) => {}
  validations?: object
  validateOnBlur?: boolean
}

const defaultProps = {
  validate: undefined,
  validations: undefined,
  validateOnBlur: false
}

const Form = ({ validate, validations, ...otherProps }: FormProps & any ) => (
  <Formik
  {...otherProps}
  validate={(values: FormikValues) => {
    if (validate) {
      return validate(values)
    }
    if (validations) {
      return generateErrors(values, validations)
    }
    return {}
  } }  />
)

Form.Element = (props: any) => <FormikForm noValidate {...props} />

Form.Field = mapValues(
  Field,
  (FieldComponent) =>
    ({ name, validate, ...props }: any) =>
      (
        <FormikField name={name} validate={validate}>
          {({ field, form: { touched, errors, setFieldValue } }: any) => (
            <FieldComponent
              {...field}
              {...props}
              name={name}
              error={get(touched, name) && get(errors, name)}
              onChange={(value: any) => setFieldValue(name, value)}
            />
          )}
        </FormikField>
      )
)

Form.initialValues = (data: any, getFieldValues: any) =>
  getFieldValues((key: any, defaultValue = '') => {
    const value = get(data, key)
    return value === undefined || value === null ? defaultValue : value
  })

Form.handleAPIError = (error: any, form: any) => {
  if (error.data.fields) {
    form.setErrors(error.data.fields)
  } else {
    toast.error(error)
  }
}

Form.is = is

Form.defaultProps = defaultProps

export default Form
