import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authorizeUser, userGetInfo } from '../actions/user';
import { fileGet } from '../actions/file';


/* eslint camelcase: 0 */

@connect( state => ({
  user: state.user,
  filePath: state.file.filePath,
  file: state.file.file,
  fileName: state.file.fileName,
  fileLoaded: state.file.fileLoaded,
  fileLoading: state.file.fileLoading
}),
dispatch => bindActionCreators({ 
  authorizeUser,
  userGetInfo,
  fileGet
}, dispatch))
export default class FileView extends Component {
  getHeader() {
    const { fileName } = this.props;

    if (fileName) {
      return (
        <h3>
          { fileName }
        </h3>
      );
    }

    return (
      <h3>
        -
      </h3>
    );
  }

  getContent() {
    const { file, fileLoaded, fileLoading } = this.props;

    if (!fileLoaded && !fileLoading) {
      return '';
    }

    if (!fileLoaded && fileLoading) {
      return 'Loading...';
    }

    return file.split(/\n/).map((line, i) => (
      <p key={i}>
        { line }
      </p>
    ));
  }

  render() {
    const { user } = this.props;
    
    if (!user.authorized) return null;


    return (
      <div style={{
        padding: '10px 20px',
        marginBottom: '100px',
        borderLeft: '1px solid #aaa',
        minHeight: '80vh'
      }}>
        { this.getHeader() }
        <div style={{
          fontFamily: 'monospace',
          paddingBottom: '100px'
        }}>
          { this.getContent() }
        </div>
      </div>
    );
  }
}
