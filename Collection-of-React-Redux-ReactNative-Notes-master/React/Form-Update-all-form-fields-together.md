Building the Form Component.

### Purpose of this component is to implement - saving all form-input fields in a single state variable which is an object instead of many state variable

**The key point in this component is all the form field are saved in a single nested state value, named 'values' here. Which is the better way to do as I will NOT have separate action generator function to update the individual form-input fields. The payload being dispatched is always this.state.values which is an object containing all the form-input fields**

Only two fields: email and password. On input change of these fields, we will dispatch an action to update the form values in the global store object.

Note in below component is just for example, its not the ideal as I am not using actionGenerators functions, instead I am dispatching types directly after setState

SignInForm.js

```js
import React, { Component } from "react"
import { connect } from "react-redux"

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: {
        email: "",
        password: "",
      },
    }
  }

  submitForm = e => {
    e.preventDefault()
    this.props.dispatch({
      type: "SUBMIT_FORM",
    })
  }

  handleInputChange = e =>
    this.setState(
      {
        values: { ...this.state.values, [e.target.name]: e.target.value },
      },
      () =>
        this.props.dispatch({
          type: "SET_FORMVALUES",
          payload: this.state.values,
        }),
    )

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <div className="input-group">
            <label htmlFor="email">E-mail Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.values.email}
              onChange={this.handleInputChange}
              title="Email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.values.password}
              onChange={this.handleInputChange}
              title="password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="message">
          {this.props.message.length > 0 && this.props.message}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.message,
})

export default connect(mapStateToProps)(SignInForm)
```

#### Further Reading

[https://www.pluralsight.com/guides/trigger-form-submit-in-child-component-redux](https://www.pluralsight.com/guides/trigger-form-submit-in-child-component-redux)
