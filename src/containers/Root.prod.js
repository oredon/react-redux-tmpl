import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Simple from '../components/Simple';
import * as Test from '../actions/test';

class Add extends Component {
  render() {
    const { routerParams, test, actionsTest } = this.props;

    return (
      <div>
        <Simple />
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
)(Add);
