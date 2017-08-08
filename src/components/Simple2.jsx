import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Simple2 extends Component {
  /**
   * ボタンクリック時にaction関数を実行
   * @param  {Object} e イベントオブジェクト
   * @return {Boolean}   aタグイベントキャンセル（false）
   */
  onClickHandler(e){
    e.preventDefault();
    this.props.actionsTest.changeData();
    return false;
  }
  /**
   * URLパラメタに応じて表示時処理を実行
   */
  componentWillMount(){//componentWillMountはSSRでも実行され、componentDidMountはSSRでは実行されない
    if(this.props.routerParams.yearmonth === "clear"){
      this.props.actionsTest.clearData();
    }
  }

  render() {
    return (
      <div>
        <p>Simple2 Component.</p>
        <p><a href="#" onClick={this.onClickHandler.bind(this)}>Click</a></p>
        <p><span>testdata: {this.props.test.testdata}</span></p>
        {(() => {
          if(this.props.routerParams.yearmonth){
            return (<p>param: {this.props.routerParams.yearmonth}</p>)
          }
        })()}
        <p><Link to="/">Back to index.</Link></p>
      </div>
    );
  }
}
