import React, { Component } from 'react';

class MainPage extends Component {
  state = {
    message: 'hello World'
  };
  render() {
    return (
      <div>
        <h1>MainPage Work</h1>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}
export default MainPage;
