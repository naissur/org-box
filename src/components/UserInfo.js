import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authorizeUser, userGetInfo } from '../actions/user';

@connect( state => ({
  user: state.user
}),
dispatch => bindActionCreators({ 
  authorizeUser,
  userGetInfo
}, dispatch))


export default class UserInfo extends Component {
  componentDidMount() {
    this.props.userGetInfo();
  }

  handleAuthorize() {
    this.props.authorizeUser();
  }

  getContent() {
    const { user } = this.props;
    const { infoLoaded, infoLoading, info } = user;

    if (infoLoading) {
      return (
        'Loading user info...'
      );
    }

    if (!infoLoading && !infoLoaded) {
      return (
        <button onClick={::this.handleAuthorize}>
          Authorize
        </button>
      );
    }

    return (
      `Hello, ${ info.display_name }!`
    );
  }

  render() {
    return (
      <div style={{ textAlign: 'right', padding: '10px 20px' }}>
        { this.getContent() }
      </div>
    );
  }
}
