import React, { Component, PropTypes } from 'react';
import { setPropTypes, compose, pure, setDisplayName } from 'recompose';

class TextFileView extends Component {
  render() {
    const { file } = this.props;

    return (
      <div>
        {file.split(/\n/).map((line, i) => (
          <p key={i}>
            { line }
          </p>
        ))}
      </div>
    );
  }
}

export default compose(
  pure,
  setDisplayName('TextFileView'),
  setPropTypes({
    file: PropTypes.string.isRequired
  })
)(TextFileView);

