import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { dropboxOauth } from './actions/dropbox';

const queryString = require('query-string');

import UserInfo from './UserInfo';


@connect(() => ({}), dispatch => bindActionCreators({
  dropboxOauth
}, dispatch))
export class App extends Component {
  constructor(props) {
    super(props);

    const config = queryString.parse(window.location.hash);
    if(config.access_token && config.token_type && config.uid) {
      props.dropboxOauth(config);
    }
  }

  render() {
    return (
      <div>
        <UserInfo />
      </div>
    );
  }
}
