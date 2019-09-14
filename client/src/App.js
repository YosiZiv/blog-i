import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/layout/Navigation/Navigation';
import SideNavigation from './components/layout/SideNavigation/SideNavigation';
import BackDrop from './components/layout/BackDrop/BackDrop';
import MainPage from './components/pages/MainPage/MainPage';
// import AboutPage from './components/pages/AboutPage/AboutPage';
// import ContentPage from './components/pages/ContentPage/ContentPage';
// import AdminPage from './components/pages/AdminPage/AdminPage';
import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  render() {
    let backDrop;
    if (this.state.sideDrawerOpen) {
      backDrop = <BackDrop click={this.backdropClickHandler} />;
    }
    const routes = (
      <Switch>
        <Route component={MainPage} path="/" exact />
        {/* <Route component={AboutPage} path="/about" />
        <Route component={ContentPage} path="/content" />
        <Route component={AdminPage} path="/admin" /> */}
      </Switch>
    );

    return (
      <div className="App">
        <Navigation drawerToggleClick={this.drawerToggleClickHandler} />
        <SideNavigation show={this.state.sideDrawerOpen} />
        {backDrop}
        <div className="PageContainer">{routes}</div>
      </div>
    );
  }
}

export default App;
