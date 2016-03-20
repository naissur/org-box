import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { noop } from './actions/noop';

@connect( state => ({
  state
}),
dispatch => bindActionCreators({ 
  noop 
}, dispatch))


export default class Authorize extends Component {
  handleAuthorize() {
    this.props.noop();
    console.log('authorize');
  }

  render() {
    return (
      <div>
        <button onClick={::this.handleAuthorize}>
          Authorize
        </button>
      </div>
    );
  }
}
