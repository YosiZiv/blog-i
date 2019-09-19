import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/layout/Navigation/Navigation';
import SideNavigation from './components/layout/SideNavigation/SideNavigation';
import BackDrop from './components/layout/BackDrop/BackDrop';
import MainPage from './components/pages/MainPage/MainPage';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import { autoLogin } from './redux/actions/auth';

// import AboutPage from './components/pages/AboutPage/AboutPage';
// import ContentPage from './components/pages/ContentPage/ContentPage';
// import AdminPage from './components/pages/AdminPage/AdminPage';
import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };
  componentDidMount() {
    const { autoLogin, token } = this.props;
    if (!token) {
      autoLogin();
    }
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  render() {
    const { token } = this.props;
    let backDrop;
    if (this.state.sideDrawerOpen) {
      backDrop = <BackDrop click={this.backdropClickHandler} />;
    }
    const routes = (
      <Switch>
        <Route component={MainPage} path="/" exact />
        <Route component={Login} path="/login" />
        <Route component={Logout} path="/logout" />
      </Switch>
    );

    return (
      <div className="App">
        <Navigation
          isAuth={token}
          drawerToggleClick={this.drawerToggleClickHandler}
        />
        <SideNavigation show={this.state.sideDrawerOpen} />
        {backDrop}
        <div className="PageContainer">{routes}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};
export default connect(
  mapStateToProps,
  { autoLogin }
)(App);
