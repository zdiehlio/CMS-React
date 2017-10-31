import React, { Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {createPost } from '../actions'

class PostsNew extends Component {
  renderField(field) {
    const {meta: {touched, error}} = field //destructuring for cleaner code
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className = 'text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { handleSubmit } = this.props
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name='title'
          label='Title'
          component={this.renderField}
        />
        <Field
          name='categories'
          label='Categories'
          component={this.renderField}
        />
        <Field
          name='content'
          label='Content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  // console.log(values) --> { title: 'kaicem', categories: 'akcec', content: 'akcmeim'}
  const errors = {}

  //Validate inputs from 'values'
  if(!values.title || values.title.length < 3) {
    errors.title = 'Enter a Title that is at least 3 characters'
  }
  if(!values.categories) {
    errors.categories = 'Enter a Category'
  }
  if(!values.content) {
    errors.content = 'Enter some Content'
  }
  //if errors is empty, the form is fine to submit
  //if errors has any properties, redux form assumes form is invalid
  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
)
