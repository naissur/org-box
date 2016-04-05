import React, { Component, PropTypes } from 'react';
import { setPropTypes, compose, pure, setDisplayName, withReducer } from 'recompose';

import org from 'org-mode-parser';

window.org = org;

const NodeBody = ({ body }) => (
  <div style={{ padding: '0px 16px', paddingBottom: '16px' }} >
    { body.split('\n').map( (line, index) => (
      <p key={index} >{line}</p>
    ))}
  </div>
);

const NodeHead = ({ onClick, headline, level }) => {
  const HN = `h${ level + 1 }`;

  return (
    <HN style={{ padding:'4px 0px' }} {...{ onClick }} >{ headline }</HN>
  );
};

const PureNode = ({ open, cycleVisibility, headline, level, body }) => (
  <div style={{ paddingLeft: ((level - 1) * 32) }}>
    <div style={{ cursor: 'pointer' }}>
      <NodeHead {...{ headline, level }} 
        onClick={cycleVisibility}
      />
    </div>

    {open && (body.length > 0) && (
      <NodeBody {...{ body }} />
    )}
  </div>
);

const CYCLE_SUBTREE_VISIBILITY = 'CYCLE_SUBTREE_VISIBILITY';
const FOLDED = 'FOLDED';
const CHILDREN = 'CHILDREN';
const SUBTREE = 'SUBTREE';

const getNextVisibility = curr => {
  switch (curr) {
    case FOLDED: return CHILDREN;
    case CHILDREN: return SUBTREE;
    case SUBTREE: return FOLDED;
    default: return FOLDED;
  }
}

const cycleSubtreeVisibility= ({ node, nodes }) => ({ type: CYCLE_SUBTREE_VISIBILITY, payload: { node, nodes }});

const getSubtreeNodes = (nodes, node) => {
  const ofd = new org.OrgQuery(nodes);

  const subtree = ofd.selectSubtree(node);
  const { allNodes } = subtree;
  
  return allNodes;
}

const getCurrentSubtreeVisibility = subtree => {
  console.log(subtree);

  // ...
  return CHILDREN;
}


const setSubtreeVisibility = (subtreeNodes, nodes, nextVisibility) => {
  return {};
}

const visibilityReducer = (visibilityTree, action) => {
  const { payload } = action;

  switch (action.type) {
    case CYCLE_SUBTREE_VISIBILITY:
      const { node, nodes } = payload;
      // TODO compose
      const subtreeNodes = getSubtreeNodes(nodes, node);
      const currentVisibility = getCurrentSubtreeVisibility(visibilityTree, subtreeNodes);
      const nextVisibility = getNextVisibility(currentVisibility);
      const nextState = setSubtreeVisibility(subtreeNodes, nodes, nextVisibility);

      return nextState;

    default:
      return visibilityTree;
  }
}
const NodesTree = withReducer(
  'visibilityTree', 'dispatch', visibilityReducer, {},
  ({ visibilityTree, dispatch, nodes }) => {
    console.log(visibilityTree);

    return (
      <div>
        {nodes.map((node, index) => (
          <PureNode
            key={index}
            {...node} open
            cycleVisibility={() => dispatch(cycleSubtreeVisibility({ node, nodes }))}
          />)
        )}
      </div>
    );
  }
);

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

