import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authorizeUser } from './actions/user';

@connect( state => ({
  user: state.user
}),
dispatch => bindActionCreators({ 
  authorizeUser 
}, dispatch))


export default class Authorize extends Component {
  handleAuthorize() {
    this.props.authorizeUser();
    console.log(this.props.user);
  }

  render() {
    return (
      <div>
        <button onClick={::this.handleAuthorize}>
          Authorize
        </button>
        { this.props.user.data }
      </div>
    );
  }
}
