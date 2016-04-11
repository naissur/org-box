import React, { Component, PropTypes } from 'react';
import { setPropTypes, compose, pure, setDisplayName } from 'recompose';

import org from 'org-mode-parser';

import NodesTree from './OrgNodesTree';


class OrgFileView extends Component {
  render() {
    const { file } = this.props;

    const nodes = org.parseBigString(file);
    window.nodes = nodes;

    return (
      <div>
        <NodesTree {...{ nodes }} />
      </div>
    );
  }
}

export default compose(
  pure,
  setDisplayName('OrgFileView'),
  setPropTypes({
    file: PropTypes.string.isRequired
  })
)(OrgFileView);

