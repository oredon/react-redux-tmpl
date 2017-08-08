import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Simple from '../components/Simple';
import * as Test from '../actions/test';

class Top extends Component {
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
  // reducerと同名のオブジェクトがstateに格納されているため任意でpropsに渡す
  return {
    routerParams: ownProps.params
  };
}

function mapDispatchToProps(dispatch) {
  // importしたactionを任意でpropsに渡す
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
