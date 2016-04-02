import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authorizeUser, userGetInfo } from '../actions/user';
import { folderGet } from '../actions/folder';
import { fileGet } from '../actions/file';

const path = require('path');


const getEntryNavigationFunction = ({ tag, onNavigate, onViewFile }) => {
  if (tag === 'file') {
    return onViewFile;
  }

  if (tag === 'folder') {
    return onNavigate;
  }

};

/* eslint camelcase: 0 */
const renderEntry = ({ entry, onNavigate, onViewFile }) => {
  const { path_lower, name, id } = entry;

  const tag = entry['.tag'];
  const navFunc = getEntryNavigationFunction({ tag, onNavigate, onViewFile });

  return (
    <div key={id}>
      <a href='#' onClick={
        ev => {
          ev.preventDefault();
          navFunc(path_lower, name);
        }}
      >
        { name }
      </a>
    </div>
  );
}


@connect( state => ({
  user: state.user,
  folderPath: state.folder.folderPath,
  folder: state.folder.folder,
  folderLoaded: state.folder.folderLoaded,
  folderLoading: state.folder.folderLoading,

  filePath: state.file.filePath,
  file: state.file.file,
  fileLoaded: state.file.fileLoaded,
  fileLoading: state.file.fileLoading
}),
dispatch => bindActionCreators({ 
  authorizeUser,
  userGetInfo,
  folderGet,
  fileGet
}, dispatch))
export default class Directory extends Component {
  componentDidMount() {
    const { folderLoaded } = this.props;

    if (!folderLoaded) {
      this.props.folderGet('');
    }
  }

  onNavigateEntry(path) {
    this.props.folderGet(path);
  }

  onViewFile(path, name) {
    this.props.fileGet(path, name);
  }

  getUpPath() {
    const { folderPath } = this.props;

    const upPath = path.resolve(folderPath, '../');

    if (upPath === '/') return '';
    return upPath;
  }

  renderUp() {
    const { folderPath } = this.props;

    if (folderPath === '') return null;

    const upPath = this.getUpPath();

    return (
      <a href='#' onClick={
        ev => {
          ev.preventDefault();
          this.onNavigateEntry(upPath);
        }}
      >
        Up
      </a>
    );
  }

  getHeader() {
    const { folderPath } = this.props;

    return (
      <h3>
        { (folderPath === '' ? '/' : folderPath) } { this.renderUp() }
      </h3>
    );
  }

  getContent() {
    const { user } = this.props;
    
    if (!user.authorized) return null;

    const { folder, folderLoaded, folderLoading } = this.props;

    if (!folderLoaded && folderLoading) {
      return (
        'Loading...'
      );
    }


    const { entries } = folder;

    return (
      entries.map(entry => renderEntry({ entry,
                                          onNavigate : ::this.onNavigateEntry,
                                          onViewFile : ::this.onViewFile }))
    );
  }

  render() {
    const { user } = this.props;
    
    if (!user.authorized) return null;

    const { folderLoaded, folderLoading } = this.props;

    if (!folderLoaded && !folderLoading) {
      return (
        null
      );
    }

    return (
      <div style={{
        padding: '10px 20px'
      }} 
      >
        { this.getHeader() }
        { this.getContent() }
      </div>
    );
  }
}
