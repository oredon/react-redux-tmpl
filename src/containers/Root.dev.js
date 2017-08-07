import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Simple from '../components/Simple';
import * as Test from '../actions/test';
import DevTools from './DevTools';

class Root extends Component {
  render() {
    const { test, actionsTest } = this.props;

    return (
      <div>
        <Simple />
        <DevTools />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    test: state.test,
    routerParams: ownProps.params
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsTest: bindActionCreators(Test, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
