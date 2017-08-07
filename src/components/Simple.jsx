import React, { Component } from 'react';

export default class Simple extends Component {
  render() {
    console.log(this.props)
    return (
      <p>
        Simple Component.
      </p>
    );
  }
}