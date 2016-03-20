import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authorizeUser } from './actions/user';

@connect( state => ({
  state
}),
dispatch => bindActionCreators({ 
  authorizeUser 
}, dispatch))


export default class Authorize extends Component {
  handleAuthorize() {
    this.props.authorizeUser();
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
