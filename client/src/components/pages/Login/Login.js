/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../layout/Input/Input';
import Button from '../../layout/Button/Button';
import classes from './Login.module.css';
import { loginStart } from '../../../redux/actions/auth';
import { updateObject, checkValidity } from '../../../shared/utility';

class Login extends Component {
  state = {
    login: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'אימייל'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'סיסמא'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 20
        },
        valid: false,
        touched: false
      }
    },
    messages: null,
    redirectTo: false
  };
  inputChangeHandler = (event, controlName) => {
    const { login } = this.state;
    const updatedControls = updateObject(login, {
      [controlName]: updateObject(login[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, login[controlName].validation),
        touched: true
      })
    });
    this.setState({ login: updatedControls, messages: null });
  };

  submitHandler = async event => {
    const { loginStart } = this.props;
    const { login } = this.state;
    const userData = {
      email: login.email.value,
      password: login.password.value
    };
    loginStart(userData);
  };

  render() {
    const { login } = this.state;
    const { message } = this.props;

    const token = localStorage.getItem('token');
    const formElementArray = [];
    Object.entries(login).forEach(key => {
      formElementArray.push({
        id: [key[0]],
        config: { ...key[1] }
      });
    });

    const form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        changed={event => this.inputChangeHandler(event, formElement.id)}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
      />
    ));
    return (
      <div className={classes.Login}>
        {token ? <Redirect to="/" /> : null}
        <div className={classes.LoginCard}>
          <h1>Blog-i Login</h1>
          <div className={classes.LoginForm}>
            <form onSubmit={this.submitHandler}>
              {form}
              <div className={classes.Button}>
                <button
                  className="btn btn-success"
                  onClick={this.submitHandler}
                  type="button"
                >
                  Login
                </button>
              </div>
            </form>
            <div className={classes.LoginMessage}>{message}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    message: state.ui.message
  };
};
export default connect(
  mapStateToProps,
  { loginStart }
)(Login);
