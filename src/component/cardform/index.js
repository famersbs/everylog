import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateForm, clear, save } from '../../modules/card'

import Form from './form'
import { DISPLAY_DATE_TIME, InputType } from './type'
export { InputType, DISPLAY_DATE_TIME }


const CardForm = props => {
  const { spec, updateForm, clear, save } = props
  const form = props.card.form

  return (
    <Form
      form={form}
      updateForm={updateForm}
      spec={spec}
      onSave={save}
      onCancel={clear}
    />
  )
}

const mapStateToProps = ({ card }) => ({
  card
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateForm,
      save,
      clear
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm)
