import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { dropboxOauth } from './actions/dropbox';

const queryString = require('query-string');

import UserInfo from './UserInfo';
import Directory from './Directory';

const CONFIG_STORAGE_KEY = 'DB_CONFIG';


@connect(() => ({}), dispatch => bindActionCreators({
  dropboxOauth
}, dispatch))
export class App extends Component {
  getConfig() {
    const hashConfig = queryString.parse(window.location.hash);

    if (hashConfig.token_type) {
      localStorage.setItem(CONFIG_STORAGE_KEY, window.location.hash);
      return hashConfig;
    }

    const storageConfig = queryString.parse(localStorage.getItem(CONFIG_STORAGE_KEY));
    if (storageConfig.token_type) return storageConfig;

    return {};
  }

  constructor(props) {
    super(props);

    const config = this.getConfig();
    if(config.access_token && config.token_type && config.uid) {
      props.dropboxOauth(config);
    }
  }

  render() {
    return (
      <div>
        <UserInfo />
        <Directory />
      </div>
    );
  }
}
