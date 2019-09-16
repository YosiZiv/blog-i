/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../layout/Input/Input';
import Button from '../../layout/Button/Button';
import classes from './Login.module.css';
import { login } from '../../../redux/actions/auth';
import { testRedux } from '../../../redux/actions/ui';
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
  componentDidMount() {
    const { login, testRedux } = this.props;
    testRedux();
  }
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
    const { onAuth } = this.props;
    const { login } = this.state;
    const payload = {
      email: login.email.value,
      password: login.password.value
    };
    event.preventDefault();
    login(payload);
  };

  render() {
    const { login, messages } = this.state;
    const { testMessage } = this.props;

    const token = localStorage.getItem('jwtToken');
    const formElementArray = [];
    Object.entries(login).forEach(key => {
      formElementArray.push({
        id: [key[0]],
        config: { ...key[1] }
      });
    });
    console.log(formElementArray);

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
        {token ? <Redirect to="/admindashboard" /> : null}
        <div className={classes.LoginCard}>
          <h2>התחבר למערכת ערבות</h2>
          <h2>למנהלים בעלי גישה בלבד</h2>
          {testMessage ? <h2>{testMessage}</h2> : null}
          <div className={classes.LoginForm}>
            <form className={classes.formFlex} onSubmit={this.submitHandler}>
              {form}
              <div className={classes.Error}>{messages}</div>
              <div className={classes.Button}>
                <Button clicked={this.submitHandler}>
                  <i
                    role="presentation"
                    style={{
                      color: '#1D9D46',
                      marginRight: '5px',
                      fontSize: '3.2vw',
                      cursor: 'pointer'
                    }}
                    className="fas fa-sign-in-alt"
                  />
                </Button>
              </div>
            </form>
            <div className={classes.LoginMessage}></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    testMessage: state.ui.message
  };
};
export default connect(
  mapStateToProps,
  { testRedux, login }
)(Login);
