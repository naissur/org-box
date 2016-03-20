import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authorizeUser, userGetInfo } from './actions/user';
import { folderGet } from './actions/folder';


/* eslint camelcase: 0 */
const renderEntry = ({ entry, onNavigate }) => {
  const { path_lower, name, id } = entry;

  return (
    <div key={id}>
      <a href='#' onClick={
        ev => {
          ev.preventDefault();
          onNavigate(path_lower);
        }}
      >
        { name }
      </a>
    </div>
  );
}


@connect( state => ({
  user: state.user,
  folder: state.folder.folder,
  folderLoaded: state.folder.folderLoaded,
  folderLoading: state.folder.folderLoading
}),
dispatch => bindActionCreators({ 
  authorizeUser,
  userGetInfo,
  folderGet
}, dispatch))
export default class Directory extends Component {
  componentDidMount() {
    const { folderLoaded } = this.props;

    if (!folderLoaded) {
      this.props.folderGet('');
    }
  }

  onNavigateEntry(path) {
    console.log('navigate', path);
  }

  render() {
    const { user } = this.props;
    
    if (!user.authorized) return null;

    const { folder, folderLoaded, folderLoading } = this.props;

    if (!folderLoaded && folderLoading) {
      return (
        <div>
          Loading folder...
        </div>
      );
    }

    if (!folderLoaded && !folderLoading) {
      return (
        null
      );
    }

    const { entries } = folder;

    return (
      <div>
        <h3>
          Directory
        </h3>

        <div>
          {entries.map(entry => renderEntry({ entry, onNavigate : ::this.onNavigateEntry }))}
        </div>
      </div>
    );
  }
}
