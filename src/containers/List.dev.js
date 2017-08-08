import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Simple2 from '../components/Simple2';
import * as Test from '../actions/test';
import DevTools from './DevTools';

class List extends Component {
  render() {
    const { routerParams, test, actionsTest } = this.props;

    return (
      <div>
        <Simple2 test={test} actionsTest={actionsTest} routerParams={routerParams} />
        <DevTools />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // reducerと同名のオブジェクトがstateに格納されているため任意でpropsに渡す
  return {
    test: state.test,
    routerParams: ownProps.params
  };
}

function mapDispatchToProps(dispatch) {
  // importしたactionを任意でpropsに渡す
  return {
    actionsTest: bindActionCreators(Test, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
