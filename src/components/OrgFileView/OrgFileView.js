import React, { Component, PropTypes } from 'react';
import { setPropTypes, compose, pure, setDisplayName, withReducer } from 'recompose';

import org from 'org-mode-parser';
import curry from 'curry'
import { equals, map, prop, filter, reduce, all, assoc } from 'ramda';


const NodeBody = ({ body }) => (
  <div style={{
    padding: '0px 16px',
    paddingBottom: '0px'
  }} >
    <div
      style={{
        borderLeft: '1px solid #999',
        borderBottom: '1px solid #999'
      }}
    >
      { body.split('\n').map( (line, index) => (
        <p 
          style={{
            padding: '4px 12px'
          }}
          key={index}
        >
          {line}
        </p>
      ))}
    </div>
  </div>
);

const NodeHead = ({ onClick, headline, level, bodyCollapsed }) => {
  const HN = `h${ level}`;

  return (
    <HN style={{
      borderBottom: '1px solid #999',
      borderTop: '1px solid #999',
      borderLeft: '1px solid #999',
      marginTop: '-1px',
      padding:'4px 12px' }} {...{ onClick }}
    >
      { headline }
      { bodyCollapsed ? (<span style={{ color: '#888' }}> ...</span>) : null }
    </HN>
  );
};

const PureNode = ({ open, cycleVisibility, headline, level, body }) => (
  <div style={{ paddingLeft: ((level - 1) * 16) }}>
    <div style={{ cursor: 'pointer' }}>
      <NodeHead {...{ headline, level }} 
        bodyCollapsed={!open} onClick={cycleVisibility}
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

const NODE_OPEN = 'NODE_OPEN';
const NODE_FOLDED = 'NODE_FOLDED';
const NODE_HIDDEN = 'NODE_HIDDEN';

export const getNextVisibility = curr => {
  switch (curr) {
    case FOLDED: return CHILDREN;
    case CHILDREN: return SUBTREE;
    case SUBTREE: return FOLDED;
    default: return FOLDED;
  }
}

const cycleSubtreeVisibility= curry(
  ({ node, nodes }) => ({ type: CYCLE_SUBTREE_VISIBILITY, payload: { node, nodes }})
);

const getSubtreeNodes = curry(
  (nodes, node) => {
    const ofd = new org.OrgQuery(nodes);

    const subtree = ofd.selectSubtree(node);
    const { allNodes } = subtree;
    
    return allNodes;
  }
);

const getSubtreeNodesKeys = curry(
  (nodes, node) => 
    compose(
      map(prop('key')),
      getSubtreeNodes(nodes)
    )(node)
);

const getChildrenNodes = curry(
  (nodes, node) => (
    filter(
      compose(equals(node.level + 1), prop('level'))
    )(getSubtreeNodes(nodes, node))
  )
);

const getChildrenNodesKeys = curry(
  (nodes, node) => (
    compose(
      map(prop('key')),
      getChildrenNodes(nodes)
    )(node)
  )
);

const getNextSubtreeVisibility = curry(
  (visibilityTree, nodes, node) => {
    const subtreeNodes = getSubtreeNodes(nodes, node);

    const nodeKey = node.key;
    const subtreeKeys = subtreeNodes.map(x => x.key);

    const nodeFolded = (visibilityTree[nodeKey] === NODE_FOLDED);

    if (nodeFolded) return CHILDREN;

    const allOpen = compose(
      all(equals(NODE_OPEN)),
      map(key => visibilityTree[key])
    )(subtreeKeys);

    if (allOpen) return FOLDED;

    const allChildrenOpen = compose(
      all(equals(NODE_OPEN)),
      map(key => (visibilityTree[key])),
      getChildrenNodesKeys(nodes)
    )(node);

    if (allChildrenOpen) return SUBTREE;

    return SUBTREE;
  }
);


const setNodesVisibility = curry(
  (val, keys, currTree ) => (
    reduce(
      (res, key) => assoc(key, val, res),
      currTree,
      keys
    )
  )
);

const setSubtreeVisibility = curry(
  (nodes, node, visibilityTree, nextVisibility) => {
    const nodeKey = node.key;
    const subtreeNodesKeys = getSubtreeNodesKeys(nodes, node);
    const childrenNodesKeys = getChildrenNodesKeys(nodes, node);

    switch (nextVisibility) {
      case FOLDED:
        return compose(
          assoc(nodeKey, NODE_FOLDED),
          setNodesVisibility(NODE_HIDDEN, subtreeNodesKeys)
        )(visibilityTree);
        
      case CHILDREN:
        return compose(
          assoc(nodeKey, NODE_OPEN),
          setNodesVisibility(NODE_FOLDED, childrenNodesKeys),
          setNodesVisibility(NODE_HIDDEN, subtreeNodesKeys)
        )(visibilityTree);
        
      case SUBTREE:
        return compose(
          assoc(nodeKey, NODE_OPEN),
          setNodesVisibility(NODE_OPEN, subtreeNodesKeys)
        )(visibilityTree);


      default: return visibilityTree;
    }
  }
);

const visibilityReducer = (visibilityTree, action) => {
  const { payload } = action;

  switch (action.type) {
    case CYCLE_SUBTREE_VISIBILITY:
      const { node, nodes } = payload;

      const nextVisibility = getNextSubtreeVisibility(visibilityTree, nodes, node);
      const nextSubtreeVisibility = setSubtreeVisibility(nodes, node, visibilityTree, nextVisibility);

      return nextSubtreeVisibility;

    default:
      return visibilityTree;
  }
}
const NodesTree = withReducer(
  'visibilityTree', 'dispatch', visibilityReducer, {},
  ({ visibilityTree, dispatch, nodes }) => {

    return (
      <div>
        {nodes.map((node, index) => {
          const nodeVisibility = (visibilityTree[node.key] || NODE_HIDDEN);

          if ( (nodeVisibility !== NODE_HIDDEN) || (index === 0) ) return (
            <PureNode
              key={index}
              {...node} open={nodeVisibility === NODE_OPEN}
              cycleVisibility={() => dispatch(cycleSubtreeVisibility({ node, nodes }))}
            />
          );

          return null;
        })}
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

