import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Simple extends Component {
  render() {
    return (
      <div>
        <p>Simple Component.</p>
        <p><Link to="/list">Go to List</Link> | <Link to="/list/123">Go to List with param</Link> | <Link to="/list/clear">Go to List with clear.</Link> | <Link to="/list/ajax">Go to List with AJAX.</Link></p>
      </div>
    );
  }
}
