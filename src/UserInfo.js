import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authorizeUser, userGetInfo } from './actions/user';

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

  render() {
    const { user } = this.props;
    const { infoLoaded, infoLoading, info } = user;

    if (infoLoading) {
      return (
        <div>
          Loading user info...
        </div>
      );
    }

    if (!infoLoading && !infoLoaded) {
      return (
        <div>
          <button onClick={::this.handleAuthorize}>
            Authorize
          </button>
        </div>
      );
    }

    return (
      <div>
        Hello, { info.display_name } !
      </div>
    );
  }
}
